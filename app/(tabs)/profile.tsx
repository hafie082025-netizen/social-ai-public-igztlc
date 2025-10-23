import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";

export default function ProfileScreen() {
  const theme = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // User information
  const userInfo = {
    name: "Bashir Ashir",
    email: "ashirbashir2@gmail.com",
    phone: "+256702945448",
    youtubeHandle: "@bashirashir2",
  };

  const connectedAccounts = [
    {
      id: "twitter",
      name: "Twitter",
      icon: "paperplane.fill",
      color: "#1DA1F2",
      connected: true,
      handle: "@bashirashir2",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: "camera.fill",
      color: "#E4405F",
      connected: false,
      handle: "Not connected",
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: "person.2.fill",
      color: "#1877F2",
      connected: true,
      handle: "Bashir Ashir",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: "play.fill",
      color: "#FF0000",
      connected: true,
      handle: userInfo.youtubeHandle,
    },
  ];

  const renderAccountItem = (account: (typeof connectedAccounts)[0]) => (
    <View key={account.id} style={styles.accountItem}>
      <View style={styles.accountLeft}>
        <View style={[styles.accountIcon, { backgroundColor: account.color }]}>
          <IconSymbol name={account.icon} color="white" size={20} />
        </View>
        <View>
          <Text style={styles.accountName}>{account.name}</Text>
          <Text style={styles.accountStatus}>
            {account.connected ? account.handle : "Not connected"}
          </Text>
        </View>
      </View>
      <Pressable
        style={[
          styles.connectButton,
          account.connected && styles.connectButtonConnected,
        ]}
      >
        <Text
          style={[
            styles.connectButtonText,
            account.connected && styles.connectButtonTextConnected,
          ]}
        >
          {account.connected ? "Manage" : "Connect"}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== "ios" && styles.contentContainerWithTabBar,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileAvatar}>
            <IconSymbol name="person.fill" color="white" size={40} />
          </View>
          <Text style={styles.profileName}>{userInfo.name}</Text>
          <Text style={styles.profileEmail}>{userInfo.email}</Text>
          <Text style={styles.profilePhone}>{userInfo.phone}</Text>
          <Text style={styles.profileSubtitle}>AI Social Media Manager</Text>
        </View>

        {/* Connected Accounts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connected Accounts</Text>
          <View style={styles.accountsList}>
            {connectedAccounts.map(renderAccountItem)}
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <IconSymbol name="bell.fill" color={colors.primary} size={20} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Notifications</Text>
                  <Text style={styles.settingDescription}>
                    Get alerts for scheduled posts
                  </Text>
                </View>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#e0e0e0", true: colors.accent }}
                thumbColor={notificationsEnabled ? colors.primary : "#f0f0f0"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <IconSymbol name="moon.fill" color={colors.primary} size={20} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Dark Mode</Text>
                  <Text style={styles.settingDescription}>Coming soon</Text>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                disabled
                trackColor={{ false: "#e0e0e0", true: colors.accent }}
                thumbColor={darkMode ? colors.primary : "#f0f0f0"}
              />
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Posts Generated</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Accounts Connected</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Scheduled Posts</Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>AI Social Media Manager</Text>
            <Text style={styles.aboutVersion}>Version 1.0.0</Text>
            <Text style={styles.aboutDescription}>
              Generate engaging social media content powered by artificial
              intelligence. Manage multiple accounts and schedule posts all in
              one place.
            </Text>
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  contentContainerWithTabBar: {
    paddingBottom: 120,
  },
  header: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  profileSubtitle: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "600",
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
  accountsList: {
    gap: 12,
  },
  accountItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  accountLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  accountIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  accountName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  accountStatus: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  connectButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  connectButtonConnected: {
    backgroundColor: "#f3e5f5",
  },
  connectButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  connectButtonTextConnected: {
    color: colors.primary,
  },
  settingsList: {
    gap: 12,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  settingDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
  },
  aboutCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  aboutVersion: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  aboutDescription: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 20,
  },
  spacer: {
    height: 20,
  },
});
