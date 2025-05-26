import { Stack } from 'expo-router/stack'
import { useUser } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'
import SafeScreen from '@/components/SafeScreen'

export default function Layout() {
  const {isSignedIn} = useUser()
  if (!isSignedIn) {
    return <Redirect href={'/(auth)/sign-in'} /> 
  }
  return (
    <SafeScreen>
      <Stack screenOptions={{headerShown: false}} />
    </SafeScreen>
  )
}