import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import SafeScreen from '@/components/SafeScreen'

export default function AuthRoutesLayout() {
  // Call useAuth hook unconditionally to follow React rules
  const authData = useAuth();
  const isSignedIn = authData?.isSignedIn === true;

  if (isSignedIn) {
    return <Redirect href={'/(root)/'} />
  }

  return (
    <SafeScreen>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeScreen>
  )
}