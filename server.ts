import express from "express";
import { createServer as createViteServer } from "vite";
import axios from "axios";
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
      
      const response = await axios.get(rssUrl);
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_"
      });
      const jsonObj = parser.parse(response.data);
      
      const entries = jsonObj.feed.entry;
      const latestVideos = (Array.isArray(entries) ? entries : [entries]).slice(0, 3).map((entry: any) => ({
        id: entry["yt:videoId"],
        title: entry.title,
        description: entry["media:group"]?.["media:description"] || "",
        views: "Live", // RSS doesn't provide view count easily
        date: new Date(entry.published).toLocaleDateString()
      }));

      res.json(latestVideos);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      res.status(500).json({ error: "Failed to fetch videos" });
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
