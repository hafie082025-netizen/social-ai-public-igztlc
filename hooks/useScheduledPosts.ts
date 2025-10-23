
import { useState, useCallback } from "react";
import { ScheduledPost } from "@/types";

export const useScheduledPosts = () => {
  const [posts, setPosts] = useState<ScheduledPost[]>([
    {
      id: "1",
      content: "🚀 Excited to announce our new AI-powered features! #Innovation",
      platform: "twitter",
      scheduledTime: "Today at 2:00 PM",
      status: "scheduled",
    },
    {
      id: "2",
      content:
        "✨ Check out our latest blog post on social media trends! Link in bio 📱",
      platform: "instagram",
      scheduledTime: "Tomorrow at 10:00 AM",
      status: "scheduled",
    },
    {
      id: "3",
      content:
        "Join us for a live Q&A session about digital marketing! 🎥 Register now",
      platform: "facebook",
      scheduledTime: "Friday at 3:00 PM",
      status: "scheduled",
    },
    {
      id: "4",
      content: "Thank you for 10K followers! 🎉 #Milestone",
      platform: "twitter",
      scheduledTime: "Yesterday at 5:00 PM",
      status: "posted",
    },
  ]);

  const addPost = useCallback((post: ScheduledPost) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  }, []);

  const deletePost = useCallback((postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  }, []);

  const updatePost = useCallback((postId: string, updates: Partial<ScheduledPost>) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, ...updates } : post
      )
    );
  }, []);

  return {
    posts,
    addPost,
    deletePost,
    updatePost,
  };
};
