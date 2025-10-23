
export interface ScheduledPost {
  id: string;
  content: string;
  platform: "twitter" | "instagram" | "facebook";
  scheduledTime: string;
  status: "scheduled" | "posted" | "failed";
}

export interface SocialAccount {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
}

export interface GeneratedContent {
  platform: "twitter" | "instagram" | "facebook";
  content: string;
  timestamp: Date;
}

export interface UserStats {
  postsGenerated: number;
  accountsConnected: number;
  scheduledPosts: number;
}
