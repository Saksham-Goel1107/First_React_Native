import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useRouter } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { COLORS } from '@/constants/colors'

export default function AuthWelcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.appName}>Wallet</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.welcomeTitle}>Welcome to Wallet</Text>
          <Text style={styles.welcomeText}>
            Your trusted companion for managing personal finances, tracking expenses, and 
            achieving your financial goals.
          </Text>
          
          <View style={styles.buttonsContainer}>            <TouchableOpacity 
              style={styles.signupButton}
              onPress={() => router.push('/(auth)/sign-up')}
            >
              <Text style={styles.signupButtonText}>Create an Account</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => router.push('/(auth)/sign-in')}
            >
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By creating an account, you agree to our
            </Text>
            <View style={styles.termsLinks}>              <TouchableOpacity onPress={() => router.push('/(auth)/terms')}>
                <Text style={styles.link}>Terms of Service</Text>
              </TouchableOpacity>
              <Text style={styles.termsText}>, </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/privacy')}>
                <Text style={styles.link}>Privacy Policy</Text>
              </TouchableOpacity>
              <Text style={styles.termsText}> and </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/consent')}>
                <Text style={styles.link}>Consent Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 16,
  },
  contentContainer: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    marginBottom: 30,
  },
  signupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  termsContainer: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    color: '#666',
  },
  termsLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    flexWrap: 'wrap',
  },
  link: {
    color: COLORS.primary,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
