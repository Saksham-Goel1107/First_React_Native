import { useSignIn } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from '@/assets/styles/auth.styles.js'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/colors'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [Error, setError] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    try {
      if (!emailAddress || !password) {
        setError("Email and password are required");
        return;
      }

      // Start the sign-in process using the email and password provided
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        setError("Sign in failed. Please try again.")
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
     if (err.errors?.[0]?.code === "form_password_incorrect") {
      setError("Incorrect password. Please try again.")
     } else {
      setError("An error occurred. Please try again.")
     }
    }
  }
  return (
    <KeyboardAwareScrollView 
      style={{flex: 1}} 
      contentContainerStyle={{flexGrow: 1}} 
      extraScrollHeight={100} 
      enableAutomaticScroll={true} 
      enableOnAndroid={true}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/revenue-i4.png")}
          style={styles.illustration}
          contentFit="contain"
        />

        <Text style={styles.title}>Welcome Back</Text>

        {Error && (
          <View style={styles.errorContainer}>
            <Ionicons name="warning-outline" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{Error}</Text>
            <TouchableOpacity onPress={() => setError(null)}>
              <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        )}

        <TextInput
          style={[styles.input, Error && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.passwordInput, Error && styles.errorInput]}
            value={password}
            placeholder="Enter password"
            secureTextEntry={!showPassword}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons 
              name={showPassword ? "eye-outline" : "eye-off-outline"} 
              size={24} 
              color={COLORS.textLight} 
            />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <TouchableOpacity onPress={() => router.replace('/sign-up')}>
            <Text style={styles.footerLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
  
}