import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

export default function DataConsent() {
  const router = useRouter();
  const [hasConsented, setHasConsented] = React.useState(false);

  const handleToggleConsent = () => {
    setHasConsented(!hasConsented);
  };
  const handleContinue = () => {
    if (hasConsented) {
      router.replace('/sign-up');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Data Sharing Consent</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="shield-checkmark" size={64} color={COLORS.primary} />
        </View>
        
        <Text style={styles.title}>Your Privacy Matters</Text>
        
        <Text style={styles.paragraph}>
          To provide secure authentication services, we use Clerk, a third-party authentication provider.
          This means some of your personal information will be shared with Clerk, including:
        </Text>
        
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>• Email address</Text>
          <Text style={styles.bulletPoint}>• Name (if provided)</Text>
          <Text style={styles.bulletPoint}>• Authentication data</Text>
          <Text style={styles.bulletPoint}>• IP address</Text>
          <Text style={styles.bulletPoint}>• Device information</Text>
        </View>
        
        <Text style={styles.paragraph}>
          Clerk processes this information according to their privacy policy to authenticate you and protect your account.
          Your financial data in the Wallet app is not shared with Clerk.
        </Text>
          <View style={styles.linksContainer}>
          <Text style={styles.link} onPress={() => router.replace('/terms')}>Terms and Conditions</Text>
          <Text style={styles.link} onPress={() => router.replace('/privacy')}>Privacy Policy</Text>
          <Text style={styles.link} onPress={() => router.push('https://clerk.dev/privacy')}>
            Clerk&apos;s Privacy Policy
          </Text>
        </View>
        
        <View style={styles.consentContainer}>
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={handleToggleConsent}
            activeOpacity={0.7}
          >
            <View style={[
              styles.checkbox,
              hasConsented && styles.checkboxChecked
            ]}>
              {hasConsented && <Ionicons name="checkmark" size={16} color="white" />}
            </View>
            <Text style={styles.consentText}>
              I consent to share my authentication data with Clerk
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={[
            styles.continueButton,
            !hasConsented && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!hasConsented}
        >
          <Text style={[
            styles.continueButtonText,
            !hasConsented && styles.continueButtonTextDisabled
          ]}>
            Continue to Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
    marginBottom: 16,
  },
  bulletPoints: {
    marginVertical: 16,
    paddingLeft: 8,
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 24,
    color: '#333',
  },
  linksContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  link: {
    color: COLORS.primary,
    fontSize: 14,
    marginVertical: 4,
    textDecorationLine: 'underline',
  },
  consentContainer: {
    marginVertical: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
  },
  consentText: {
    fontSize: 14,
    flex: 1,
    color: '#333',
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonDisabled: {
    backgroundColor: '#d3d3d3',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButtonTextDisabled: {
    color: '#a9a9a9',
  },
});
