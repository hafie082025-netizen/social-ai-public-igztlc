import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import {
  ScrollView,
  Pressable,
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Platform,
  Alert,
  Clipboard,
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";
import { useContentGenerator } from "@/hooks/useContentGenerator";

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { generateContent: generateAIContent, loading, error } = useContentGenerator();
  const [topic, setTopic] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<"twitter" | "instagram" | "facebook">("twitter");

  const platforms = [
    { id: "twitter", name: "Twitter", icon: "paperplane.fill", color: "#1DA1F2" },
    { id: "instagram", name: "Instagram", icon: "camera.fill", color: "#E4405F" },
    { id: "facebook", name: "Facebook", icon: "person.2.fill", color: "#1877F2" },
  ];

  const generateContent = async () => {
    if (!topic.trim()) {
      Alert.alert("Empty Topic", "Please enter a topic to generate content");
      return;
    }
    const content = await generateAIContent(topic, selectedPlatform);
    if (content) {
      setGeneratedContent(content);
      console.log("Content generated successfully for platform:", selectedPlatform);
    } else {
      Alert.alert("Generation Failed", "Could not generate content. Please try again.");
    }
  };

  const handleCopyContent = async () => {
    try {
      await Clipboard.setString(generatedContent);
      Alert.alert("Copied!", "Content copied to clipboard");
      console.log("Content copied to clipboard");
    } catch (err) {
      console.log("Copy error:", err);
      Alert.alert("Copy Failed", "Could not copy content to clipboard");
    }
  };

  const handleSchedulePost = () => {
    if (!generatedContent) {
      Alert.alert("No Content", "Please generate content first");
      return;
    }
    router.push({
      pathname: "/(tabs)/scheduled",
      params: { 
        content: generatedContent,
        platform: selectedPlatform
      }
    });
  };

  const handlePostNow = () => {
    Alert.alert(
      "Post Now",
      `Post to ${selectedPlatform}?`,
      [
        { text: "Cancel", onPress: () => console.log("Post cancelled"), style: "cancel" },
        { 
          text: "Post", 
          onPress: () => {
            Alert.alert("Success", "Post published successfully!");
            setGeneratedContent("");
            setTopic("");
            console.log("Post published to:", selectedPlatform);
          }
        }
      ]
    );
  };

  const renderHeaderRight = () => (
    <Pressable style={styles.headerButton}>
      <IconSymbol name="plus" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === "ios" && (
        <Stack.Screen
          options={{
            title: "AI Content Generator",
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>AI Content Generator</Text>
          <Text style={styles.subtitle}>
            Generate engaging social media content instantly
          </Text>
        </View>

        {/* Platform Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Platform</Text>
          <View style={styles.platformGrid}>
            {platforms.map((platform) => (
              <Pressable
                key={platform.id}
                onPress={() => setSelectedPlatform(platform.id as any)}
                style={[
                  styles.platformButton,
                  selectedPlatform === platform.id && styles.platformButtonActive,
                ]}
              >
                <View
                  style={[
                    styles.platformIcon,
                    { backgroundColor: platform.color },
                  ]}
                >
                  <IconSymbol name={platform.icon} color="white" size={20} />
                </View>
                <Text
                  style={[
                    styles.platformName,
                    selectedPlatform === platform.id && styles.platformNameActive,
                  ]}
                >
                  {platform.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Topic Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's your topic?</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a topic or keyword..."
            placeholderTextColor={colors.textSecondary}
            value={topic}
            onChangeText={setTopic}
            multiline
            maxLength={100}
          />
          <Text style={styles.charCount}>{topic.length}/100</Text>
        </View>

        {/* Error Display */}
        {error && (
          <View style={styles.errorContainer}>
            <IconSymbol name="exclamationmark.circle" color="#FF6B6B" size={18} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Generate Button */}
        <Pressable
          style={[styles.generateButton, loading && styles.generateButtonDisabled]}
          onPress={generateContent}
          disabled={loading || !topic.trim()}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <IconSymbol name="sparkles" color="white" size={20} />
              <Text style={styles.generateButtonText}>Generate Content</Text>
            </>
          )}
        </Pressable>

        {/* Generated Content */}
        {generatedContent && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Generated Content</Text>
            <View style={styles.contentCard}>
              <Text style={styles.generatedText}>{generatedContent}</Text>
              <View style={styles.contentActions}>
                <Pressable style={styles.actionButton} onPress={handleCopyContent}>
                  <IconSymbol name="doc.on.doc" color={colors.primary} size={18} />
                  <Text style={styles.actionButtonText}>Copy</Text>
                </Pressable>
                <Pressable
                  style={styles.actionButton}
                  onPress={handleSchedulePost}
                >
                  <IconSymbol name="calendar" color={colors.primary} size={18} />
                  <Text style={styles.actionButtonText}>Schedule</Text>
                </Pressable>
                <Pressable style={styles.actionButton} onPress={handlePostNow}>
                  <IconSymbol name="paperplane.fill" color={colors.primary} size={18} />
                  <Text style={styles.actionButtonText}>Post Now</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}

        <View style={styles.spacer} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: Platform.OS === "android" ? 120 : 40,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
  },
  platformGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  platformButton: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  platformButtonActive: {
    borderColor: colors.primary,
    backgroundColor: "#f3e5f5",
  },
  platformIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  platformName: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  platformNameActive: {
    color: colors.primary,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.text,
    minHeight: 80,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: "right",
  },
  errorContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE5E5",
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  errorText: {
    fontSize: 13,
    color: "#FF6B6B",
    fontWeight: "500",
    flex: 1,
  },
  generateButton: {
    marginHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    boxShadow: "0px 4px 12px rgba(98, 0, 238, 0.3)",
    elevation: 4,
  },
  generateButtonDisabled: {
    opacity: 0.6,
  },
  generateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  contentCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  generatedText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  contentActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#f3e5f5",
    gap: 6,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  headerButton: {
    padding: 8,
  },
  spacer: {
    height: 20,
  },
});
