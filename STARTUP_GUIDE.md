
# AI Social Media Manager - Startup Guide

## 🚀 Quick Start

Your AI Social Media Manager app is now ready to run! Follow these steps to get started:

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (installed globally)
- iOS Simulator or Android Emulator (or physical device)

### Installation & Running

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```
   This will start the Expo tunnel server and display a QR code.

3. **Run on Your Device**
   - **iOS**: Press `i` in the terminal or run `npm run ios`
   - **Android**: Press `a` in the terminal or run `npm run android`
   - **Web**: Press `w` in the terminal or run `npm run web`

---

## 📱 App Features

### Home Screen (AI Content Generator)
- **Select Platform**: Choose between Twitter, Instagram, or Facebook
- **Enter Topic**: Type a topic or keyword (max 100 characters)
- **Generate Content**: AI generates platform-specific content
- **Actions**:
  - **Copy**: Copy generated content to clipboard
  - **Schedule**: Schedule the post for later
  - **Post Now**: Publish immediately

### Scheduled Posts Screen
- View all scheduled, posted, and failed posts
- Edit or delete scheduled posts
- See post details including platform and scheduled time
- Schedule new posts from generated content

### Profile Screen
- View your profile information:
  - Name: Bashir Ashir
  - Email: ashirbashir2@gmail.com
  - Phone: +256702945448
  - YouTube: @bashirashir2
- Manage connected social media accounts:
  - Twitter (Connected)
  - Instagram (Not connected)
  - Facebook (Connected)
  - YouTube (Connected)
- View statistics:
  - Posts Generated
  - Accounts Connected
  - Scheduled Posts
- Settings:
  - Notifications toggle
  - Dark Mode (coming soon)

---

## 🏗️ Project Structure

```
app/
├── (tabs)/
│   ├── (home)/
│   │   ├── _layout.tsx          # Home tab layout
│   │   └── index.tsx            # AI Content Generator screen
│   ├── profile.tsx              # Profile & Account Management
│   ├── scheduled.tsx            # Scheduled Posts Management
│   └── _layout.tsx              # Tab navigation layout
├── _layout.tsx                  # Root layout with theme
├── formsheet.tsx                # Form sheet modal
├── modal.tsx                    # Standard modal
└── transparent-modal.tsx        # Transparent modal

components/
├── FloatingTabBar.tsx           # Custom tab bar for Android/Web
├── IconSymbol.tsx               # Icon component
├── button.tsx                   # Reusable button component
├── ListItem.tsx                 # List item component
└── IconCircle.tsx               # Icon circle component

hooks/
├── useContentGenerator.ts       # AI content generation logic
└── useScheduledPosts.ts         # Scheduled posts management

styles/
└── commonStyles.ts              # Global colors and styles

types/
└── index.ts                     # TypeScript type definitions

constants/
└── Colors.ts                    # Color palette

contexts/
└── WidgetContext.tsx            # Widget context provider

utils/
└── errorLogger.ts               # Error logging utility
```

---

## 🎨 Design System

### Colors
- **Primary**: `#6200ee` (Purple)
- **Secondary**: `#03dac6` (Teal)
- **Accent**: `#bb86fc` (Light Purple)
- **Background**: `#f9f9f9` (Light Gray)
- **Text**: `#212121` (Dark Gray)
- **Text Secondary**: `#757575` (Medium Gray)
- **Card**: `#ffffff` (White)

### Typography
- **Title**: 28px, Bold (800)
- **Section Title**: 16px, Bold (700)
- **Body**: 14px, Regular (500)
- **Small**: 12px, Regular (500)

---

## 🔧 Key Technologies

- **React Native 0.81.4**: Cross-platform mobile framework
- **Expo 54**: Development platform
- **Expo Router**: File-based routing
- **React Navigation**: Navigation library
- **React Native Reanimated**: Animation library
- **TypeScript**: Type safety
- **Expo Symbols**: SF Symbols for iOS

---

## 📝 How to Use Each Screen

### 1. Home Screen - Generate Content

1. Select a social media platform (Twitter, Instagram, or Facebook)
2. Enter a topic or keyword in the text input
3. Click "Generate Content" button
4. Wait for AI to generate platform-specific content
5. Choose an action:
   - **Copy**: Copies to clipboard for manual posting
   - **Schedule**: Opens scheduling modal to set post time
   - **Post Now**: Publishes immediately (simulated)

**Example Topics**:
- "Digital Marketing Trends"
- "AI and Technology"
- "Social Media Strategy"
- "Content Creation Tips"

### 2. Scheduled Posts Screen

1. View all your scheduled posts
2. See post status (Scheduled, Posted, Failed)
3. For scheduled posts:
   - Click "Edit" to modify
   - Click "Delete" to remove
4. For posted posts:
   - Click "View" to see the published post
5. Schedule new posts from the home screen

### 3. Profile Screen

1. View your profile information
2. Manage connected accounts:
   - Click "Manage" for connected accounts
   - Click "Connect" for unconnected accounts
3. Toggle notifications on/off
4. View your statistics
5. Read about the app

---

## 🚀 Features Implemented

✅ **AI Content Generation**
- Platform-specific content generation
- Multiple content variations
- Character count tracking

✅ **Social Media Integration**
- Support for Twitter, Instagram, Facebook, YouTube
- Account connection management
- Platform-specific formatting

✅ **Post Scheduling**
- Schedule posts for specific times
- View scheduled posts
- Edit and delete scheduled posts
- Track post status

✅ **User Profile**
- Display user information
- Account management
- Statistics dashboard
- Settings

✅ **Modern UI/UX**
- Clean, minimalist design
- Smooth animations
- Dark mode support
- Responsive layout
- Tab-based navigation

---

## 🔄 Data Flow

```
Home Screen
    ↓
User enters topic + selects platform
    ↓
useContentGenerator hook
    ↓
Mock AI generates content
    ↓
Display generated content
    ↓
User chooses action (Copy/Schedule/Post)
    ↓
If Schedule → Scheduled Posts Screen
    ↓
Modal opens to set time
    ↓
Post added to scheduled list
```

---

## 🛠️ Development Tips

### Adding New Features

1. **New Screen**: Create in `app/(tabs)/` directory
2. **New Hook**: Create in `hooks/` directory
3. **New Component**: Create in `components/` directory
4. **New Type**: Add to `types/index.ts`
5. **New Style**: Add to `styles/commonStyles.ts`

### Debugging

- Use `console.log()` statements throughout the code
- Check Expo logs in terminal
- Use React DevTools for component inspection
- Use Redux DevTools for state management (if added)

### Performance Optimization

- Use `FlatList` for long lists (already implemented in Scheduled Posts)
- Memoize expensive computations with `useCallback`
- Use `React.memo` for component optimization
- Lazy load screens with Expo Router

---

## 📦 Building for Production

### Web Build
```bash
npm run build:web
```

### Android Build
```bash
npm run build:android
```

### iOS Build
```bash
eas build --platform ios
```

---

## 🐛 Troubleshooting

### App Won't Start
- Clear cache: `expo start --clear`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node version: `node --version`

### Styling Issues
- Clear Expo cache: `expo start -c`
- Check color values in `styles/commonStyles.ts`
- Verify platform-specific styles

### Navigation Issues
- Check route paths in `app/(tabs)/_layout.tsx`
- Verify file structure matches routing
- Use `useRouter()` for programmatic navigation

### Content Generation Not Working
- Check `hooks/useContentGenerator.ts`
- Verify mock data is properly formatted
- Check console for error messages

---

## 📞 Support Information

**User Details**:
- Name: Bashir Ashir
- Email: ashirbashir2@gmail.com
- Phone: +256702945448
- YouTube: @bashirashir2

---

## 🎯 Next Steps

1. **Test the app** on iOS, Android, and Web
2. **Customize content** generation with your own AI API
3. **Add real authentication** with Supabase or Firebase
4. **Connect to real social media APIs** (Twitter, Instagram, Facebook)
5. **Implement push notifications** for scheduled posts
6. **Add analytics** to track post performance
7. **Deploy to app stores** (Apple App Store, Google Play Store)

---

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Guide](https://docs.expo.dev/routing/introduction/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## ✨ App is Ready!

Your AI Social Media Manager app is fully configured and ready to run. Start with `npm run dev` and enjoy building! 🚀
