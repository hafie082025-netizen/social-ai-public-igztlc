
import { useState, useCallback } from "react";

export const useContentGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = useCallback(
    async (topic: string, platform: "twitter" | "instagram" | "facebook") => {
      if (!topic.trim()) {
        setError("Topic cannot be empty");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const hashtag = topic.replace(/\s+/g, "");
        
        // Mock AI responses based on platform with varied content
        const twitterOptions = [
          `🚀 Just discovered something amazing about ${topic}! This is going to change everything. #${hashtag} #Innovation #Future`,
          `💡 Here's what you need to know about ${topic}: It's more important than ever. Let's discuss! #${hashtag} #Insights`,
          `🔥 ${topic} is trending and here's why it matters. Join the conversation! #${hashtag} #Trending`,
          `✨ Excited to share my thoughts on ${topic}. What are your experiences? #${hashtag} #Community`,
        ];

        const instagramOptions = [
          `✨ Dive into the world of ${topic}! 🌟 From inspiration to action, we're here to guide you every step of the way. 💫 #${hashtag} #Explore #Discover #Amazing`,
          `🎯 ${topic} is more than just a trend—it's a lifestyle. Swipe to learn more! 📱 #${hashtag} #Lifestyle #Inspiration`,
          `💎 Discover the beauty of ${hashtag}. Your journey starts here. 🌈 #${hashtag} #Discover #Journey`,
          `🌟 Transform your perspective on ${topic}. Let's grow together! 🚀 #${hashtag} #Growth #Community`,
        ];

        const facebookOptions = [
          `Hey everyone! 👋 We're excited to share our latest insights on ${topic}. Whether you're just starting out or looking to level up, we've got something for everyone. Drop a comment and let us know what you think! 💬`,
          `📢 Important update: ${topic} is evolving, and we want to keep you informed. Check out our latest post for all the details! 👇 #${hashtag}`,
          `🎉 Join our community discussion about ${topic}! Share your stories, tips, and experiences in the comments below. We'd love to hear from you! 💙 #${hashtag}`,
          `💪 Empowering you with knowledge about ${topic}. Read our comprehensive guide and become an expert! 📚 #${hashtag}`,
        ];

        const platformOptions = {
          twitter: twitterOptions,
          instagram: instagramOptions,
          facebook: facebookOptions,
        };

        const options = platformOptions[platform];
        const randomContent = options[Math.floor(Math.random() * options.length)];

        console.log(`Generated content for ${platform}:`, randomContent);
        return randomContent;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to generate content";
        setError(errorMessage);
        console.log("Content generation error:", errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    generateContent,
    loading,
    error,
  };
};
