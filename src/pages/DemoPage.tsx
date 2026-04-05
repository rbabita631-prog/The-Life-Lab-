import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Youtube, Play, Calendar, Eye, Loader2, AlertCircle } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  views: string;
  date: string;
}

export default function DemoPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [subscriberCount, setSubscriberCount] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch videos
        let data = null;
        try {
          const response = await fetch('/api/latest-videos');
          const contentType = response.headers.get("content-type");
          if (response.ok && contentType && contentType.indexOf("application/json") !== -1) {
            data = await response.json();
          }
        } catch (e) {
          console.warn("Backend fetch failed, will try fallback API", e);
        }

        // Fallback for static deployments
        if (!data) {
          const rssUrl = encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=UCnKc0J80BfZJVNYFjbMyJOQ');
          const fallbackResponse = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            if (fallbackData.status === 'ok') {
              data = fallbackData.items.slice(0, 3).map((item: any) => {
                const videoId = item.guid ? item.guid.replace('yt:video:', '') : item.link.split('v=')[1];
                const cleanDescription = item.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
                return { id: videoId, title: item.title, description: cleanDescription, views: "Live", date: new Date(item.pubDate).toLocaleDateString() };
              });
            }
          }
        }
        setVideos(data || []);

        // Fetch subscriber count
        try {
          const subResponse = await fetch('/api/youtube-stats');
          if (subResponse.ok) {
            const subData = await subResponse.json();
            setSubscriberCount(subData.subscriberCount);
          }
        } catch (e) {
          console.warn("Subscriber count fetch failed", e);
        }

      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Header Section */}
      <section className="pt-12 pb-16 bg-red-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black mb-6 uppercase tracking-widest">
              <Youtube className="h-4 w-4" />
              Free Demo Classes
              {subscriberCount && (
                <span className="ml-2 pl-2 border-l border-white/30">
                  {subscriberCount} Subscribers
                </span>
              )}
            </div>
            <h1 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight">
              Latest <span className="text-red-200">Videos</span>
            </h1>
            <p className="text-xl text-red-50 font-medium leading-relaxed">
              Watch our latest demo classes and preparation strategies directly from our YouTube channel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-red-600 mb-4" />
              <p className="text-gray-500 font-bold">Loading latest videos...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-[2.5rem] p-12 text-center max-w-2xl mx-auto">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Oops! Something went wrong.</h3>
              <p className="text-gray-500 dark:text-gray-400">{error}</p>
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
              <Youtube className="h-16 w-16 text-gray-200 dark:text-gray-800 mx-auto mb-6" />
              <p className="text-xl font-black text-gray-400">No videos found. Check back later!</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all flex flex-col"
                >
                  <div className="relative w-full pt-[56.25%] bg-gray-900">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full border-0"
                    ></iframe>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 mb-4 text-sm font-bold text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {video.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {video.views}
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 line-clamp-2 leading-tight hover:text-red-600 transition-colors">
                      <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
                        {video.title}
                      </a>
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                      {video.description}
                    </p>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-3 rounded-xl font-black hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                    >
                      <Play className="h-4 w-4" />
                      Watch on YouTube
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
