
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

        // Mock AI responses based on platform
        const mockResponses: Record<string, string> = {
          twitter: `🚀 Just discovered something amazing about ${topic}! This is going to change everything. #${topic.replace(/\s+/g, "")} #Innovation #Future`,
          instagram: `✨ Dive into the world of ${topic}! 🌟 From inspiration to action, we're here to guide you every step of the way. 💫 #${topic.replace(/\s+/g, "")} #Explore #Discover #Amazing`,
          facebook: `Hey everyone! 👋 We're excited to share our latest insights on ${topic}. Whether you're just starting out or looking to level up, we've got something for everyone. Drop a comment and let us know what you think! 💬`,
        };

        return mockResponses[platform] || mockResponses.twitter;
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
