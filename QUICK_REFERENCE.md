
# Quick Reference Guide - AI Social Media Manager

## 🚀 Quick Start (30 seconds)

```bash
npm install
npm run dev
# Press 'i' for iOS, 'a' for Android, or 'w' for Web
```

---

## 📱 Screen Overview

### Home Screen (`app/(tabs)/(home)/index.tsx`)
**Purpose**: Generate AI content for social media

**Key Components**:
- Platform selector (Twitter, Instagram, Facebook)
- Topic input field
- Generate button
- Content display with actions

**Actions**:
- Copy content to clipboard
- Schedule post
- Post now

**State**:
- `topic`: User input
- `generatedContent`: AI-generated text
- `selectedPlatform`: Selected platform
- `loading`: Generation in progress

---

### Scheduled Posts Screen (`app/(tabs)/scheduled.tsx`)
**Purpose**: Manage scheduled posts

**Key Components**:
- Posts list (FlatList)
- Status badges
- Schedule modal
- Empty state

**Actions**:
- View scheduled posts
- Edit post
- Delete post
- Schedule new post

**State**:
- `scheduledPosts`: Array of posts
- `showScheduleModal`: Modal visibility
- `selectedTime`: Scheduled time

---

### Profile Screen (`app/(tabs)/profile.tsx`)
**Purpose**: User profile and account management

**Key Components**:
- Profile header
- Connected accounts list
- Settings section
- Statistics cards
- About section

**User Info**:
- Name: Bashir Ashir
- Email: ashirbashir2@gmail.com
- Phone: +256702945448
- YouTube: @bashirashir2

**Connected Accounts**:
- Twitter ✅
- Instagram ❌
- Facebook ✅
- YouTube ✅

---

## 🎣 Custom Hooks

### useContentGenerator
```typescript
const { generateContent, loading, error } = useContentGenerator();

// Usage
const content = await generateContent(topic, platform);
```

**Returns**:
- `generateContent`: Async function to generate content
- `loading`: Boolean indicating generation in progress
- `error`: Error message if generation fails

---

### useScheduledPosts
```typescript
const { posts, addPost, deletePost, updatePost } = useScheduledPosts();
```

**Returns**:
- `posts`: Array of scheduled posts
- `addPost`: Add new post
- `deletePost`: Delete post by ID
- `updatePost`: Update post by ID

---

## 🎨 Styling

### Global Colors (`styles/commonStyles.ts`)
```typescript
colors = {
  background: '#f9f9f9',
  text: '#212121',
  textSecondary: '#757575',
  primary: '#6200ee',
  secondary: '#03dac6',
  accent: '#bb86fc',
  card: '#ffffff',
  highlight: '#ffeb3b',
}
```

### Common Styles
```typescript
// Use in components
import { colors } from '@/styles/commonStyles';

<View style={{ backgroundColor: colors.background }}>
  <Text style={{ color: colors.text }}>Hello</Text>
</View>
```

---

## 🧭 Navigation

### Navigate Between Screens
```typescript
import { useRouter } from 'expo-router';

const router = useRouter();

// Navigate to scheduled posts
router.push('/(tabs)/scheduled');

// Navigate with params
router.push({
  pathname: '/(tabs)/scheduled',
  params: { content: 'Hello', platform: 'twitter' }
});
```

### Get Route Params
```typescript
import { useLocalSearchParams } from 'expo-router';

const params = useLocalSearchParams();
const { content, platform } = params;
```

---

## 📝 Common Tasks

### Add New Screen
1. Create file in `app/(tabs)/`
2. Add to `app/(tabs)/_layout.tsx`
3. Add to tab configuration

### Add New Component
1. Create file in `components/`
2. Export as default
3. Import in screen

### Add New Hook
1. Create file in `hooks/`
2. Export custom hook
3. Use in components

### Add New Type
1. Add to `types/index.ts`
2. Import where needed
3. Use for type safety

---

## 🔍 Debugging

### Console Logging
```typescript
console.log('Message:', value);
console.log('Content generated:', content);
console.log('Post scheduled:', post);
```

### Check Logs
```bash
# In terminal where dev server is running
# Logs appear automatically
```

### React DevTools
- Use Expo DevTools
- Inspect component tree
- Check props and state

---

## 🚀 Common Commands

```bash
# Start dev server
npm run dev

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web

# Build for web
npm run build:web

# Build for Android
npm run build:android

# Lint code
npm run lint
```

---

## 📦 Key Dependencies

- `react-native`: Mobile framework
- `expo`: Development platform
- `expo-router`: File-based routing
- `react-navigation`: Navigation
- `react-native-reanimated`: Animations
- `expo-symbols`: Icons

---

## 🎯 Platform-Specific Code

### iOS Only
```typescript
if (Platform.OS === 'ios') {
  // iOS specific code
}
```

### Android Only
```typescript
if (Platform.OS === 'android') {
  // Android specific code
}
```

### Web Only
```typescript
if (Platform.OS === 'web') {
  // Web specific code
}
```

---

## 💾 Data Structures

### ScheduledPost
```typescript
interface ScheduledPost {
  id: string;
  content: string;
  platform: "twitter" | "instagram" | "facebook" | "youtube";
  scheduledTime: string;
  status: "scheduled" | "posted" | "failed";
}
```

### SocialAccount
```typescript
interface SocialAccount {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
}
```

### GeneratedContent
```typescript
interface GeneratedContent {
  platform: "twitter" | "instagram" | "facebook";
  content: string;
  timestamp: Date;
}
```

---

## 🎨 Component Examples

### Button
```typescript
import Button from '@/components/button';

<Button 
  onPress={() => console.log('Pressed')}
  variant="primary"
  size="large"
>
  Click Me
</Button>
```

### IconSymbol
```typescript
import { IconSymbol } from '@/components/IconSymbol';

<IconSymbol 
  name="sparkles" 
  color={colors.primary} 
  size={24} 
/>
```

---

## 🔗 File Paths

### Absolute Imports
```typescript
// Use @ alias for absolute imports
import { colors } from '@/styles/commonStyles';
import { useContentGenerator } from '@/hooks/useContentGenerator';
import { IconSymbol } from '@/components/IconSymbol';
```

---

## 📊 State Management

### Local State
```typescript
const [topic, setTopic] = useState('');
const [loading, setLoading] = useState(false);
```

### Async Operations
```typescript
const [loading, setLoading] = useState(false);

const handleGenerate = async () => {
  setLoading(true);
  try {
    const result = await generateContent(topic, platform);
    setGeneratedContent(result);
  } catch (error) {
    console.log('Error:', error);
  } finally {
    setLoading(false);
  }
};
```

---

## 🎯 Best Practices

1. **Use TypeScript** - Always define types
2. **Use Hooks** - Prefer functional components
3. **Use Constants** - Define colors, sizes in one place
4. **Use Reusable Components** - Don't repeat code
5. **Use Console Logs** - Debug effectively
6. **Use Error Handling** - Catch and handle errors
7. **Use Loading States** - Show feedback to user
8. **Use Proper Naming** - Clear variable names

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| App won't start | `expo start --clear` |
| Styling broken | Check `styles/commonStyles.ts` |
| Navigation not working | Check route paths |
| Content not generating | Check `hooks/useContentGenerator.ts` |
| Clipboard not working | Check permissions |
| Dark mode not working | Check theme provider |

---

## 📞 Support

- **Email**: ashirbashir2@gmail.com
- **Phone**: +256702945448
- **YouTube**: @bashirashir2

---

## ✨ That's It!

You now have everything you need to work with the AI Social Media Manager app. Happy coding! 🚀
