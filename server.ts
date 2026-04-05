import express from "express";
import { createServer as createViteServer } from "vite";
import { XMLParser } from "fast-xml-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API route to fetch latest YouTube videos
  app.get("/api/latest-videos", async (req, res) => {
    try {
      const channelId = "UCnKc0J80BfZJVNYFjbMyJOQ";
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
      
      console.log(`Fetching RSS from: ${rssUrl}`);
      const response = await fetch(rssUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      if (!response.ok) {
        throw new Error(`YouTube RSS returned status ${response.status}`);
      }
      
      const xmlData = await response.text();
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_"
      });
      const jsonObj = parser.parse(xmlData);
      console.log("RSS Feed Keys:", Object.keys(jsonObj));
      if (jsonObj.feed) console.log("Feed Keys:", Object.keys(jsonObj.feed));
      
      if (!jsonObj.feed || !jsonObj.feed.entry) {
        console.log("No entries found in RSS feed");
        return res.json([]);
      }

      const entries = jsonObj.feed.entry;
      const latestVideos = (Array.isArray(entries) ? entries : [entries]).slice(0, 3).map((entry: any) => {
        const videoId = entry["yt:videoId"] || entry["videoId"];
        const title = entry.title || "Untitled Video";
        const description = entry["media:group"]?.["media:description"] || "";
        const published = entry.published || new Date().toISOString();

        return {
          id: videoId,
          title: typeof title === 'object' ? title['#text'] || title : title,
          description: typeof description === 'object' ? description['#text'] || description : description,
          views: "Live",
          date: new Date(published).toLocaleDateString()
        };
      });

      console.log(`Successfully fetched ${latestVideos.length} videos`);
      res.json(latestVideos);
    } catch (error: any) {
      console.error("Error fetching YouTube videos:", error.message);
      res.status(500).json({ 
        error: "Failed to fetch videos", 
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
