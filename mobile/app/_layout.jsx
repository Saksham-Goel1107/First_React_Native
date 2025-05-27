import { Slot } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

export default function RootLayout() {
  // Get publishable key from both sources to ensure it's available
  const publishableKey = 
    Constants.expoConfig?.extra?.clerkPublishableKey || 
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  if (!publishableKey) {
    console.error("Missing Clerk publishable key");
    return null; // Return null instead of throwing to prevent crash
  }
  
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </ClerkProvider>
  )
}
