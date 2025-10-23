
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

interface ScheduledPost {
  id: string;
  content: string;
  platform: "twitter" | "instagram" | "facebook";
  scheduledTime: string;
  status: "scheduled" | "posted" | "failed";
}

export default function ScheduledScreen() {
  const [scheduledPosts] = useState<ScheduledPost[]>([
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

  const platformColors: Record<string, string> = {
    twitter: "#1DA1F2",
    instagram: "#E4405F",
    facebook: "#1877F2",
  };

  const platformIcons: Record<string, string> = {
    twitter: "paperplane.fill",
    instagram: "camera.fill",
    facebook: "person.2.fill",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return colors.primary;
      case "posted":
        return "#4CAF50";
      case "failed":
        return "#FF6B6B";
      default:
        return colors.textSecondary;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Scheduled";
      case "posted":
        return "Posted";
      case "failed":
        return "Failed";
      default:
        return status;
    }
  };

  const renderPostItem = ({ item }: { item: ScheduledPost }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View
          style={[
            styles.platformIcon,
            { backgroundColor: platformColors[item.platform] },
          ]}
        >
          <IconSymbol
            name={platformIcons[item.platform]}
            color="white"
            size={18}
          />
        </View>
        <View style={styles.postHeaderInfo}>
          <Text style={styles.platformName}>
            {item.platform.charAt(0).toUpperCase() + item.platform.slice(1)}
          </Text>
          <Text style={styles.scheduledTime}>{item.scheduledTime}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) + "20" },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: getStatusColor(item.status) },
            ]}
          >
            {getStatusLabel(item.status)}
          </Text>
        </View>
      </View>

      <Text style={styles.postContent}>{item.content}</Text>

      <View style={styles.postActions}>
        {item.status === "scheduled" && (
          <>
            <Pressable style={styles.actionButton}>
              <IconSymbol name="pencil" color={colors.primary} size={16} />
              <Text style={styles.actionButtonText}>Edit</Text>
            </Pressable>
            <Pressable style={styles.actionButton}>
              <IconSymbol name="trash" color="#FF6B6B" size={16} />
              <Text style={[styles.actionButtonText, { color: "#FF6B6B" }]}>
                Delete
              </Text>
            </Pressable>
          </>
        )}
        {item.status === "posted" && (
          <Pressable style={styles.actionButton}>
            <IconSymbol name="eye" color={colors.primary} size={16} />
            <Text style={styles.actionButtonText}>View</Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  const emptyState = (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <IconSymbol name="calendar" color={colors.textSecondary} size={48} />
      </View>
      <Text style={styles.emptyTitle}>No Scheduled Posts</Text>
      <Text style={styles.emptyDescription}>
        Generate and schedule your first post to get started!
      </Text>
      <Pressable style={styles.emptyButton}>
        <IconSymbol name="plus" color="white" size={20} />
        <Text style={styles.emptyButtonText}>Create Post</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Scheduled Posts</Text>
        <Text style={styles.subtitle}>
          {scheduledPosts.length} posts scheduled
        </Text>
      </View>

      {scheduledPosts.length === 0 ? (
        emptyState
      ) : (
        <FlatList
          data={scheduledPosts}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContainer,
            Platform.OS !== "ios" && styles.listContainerWithTabBar,
          ]}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listContainerWithTabBar: {
    paddingBottom: 120,
  },
  postCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  platformIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  postHeaderInfo: {
    flex: 1,
  },
  platformName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  scheduledTime: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  postContent: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f3e5f5",
    gap: 6,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  emptyButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
