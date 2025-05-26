import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

export default function TermsAndConditions() {
  const router = useRouter();

return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Terms and Conditions</Text>
            <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.lastUpdated}>Last Updated: May 25, 2025</Text>
            
            <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
            <Text style={styles.paragraph}>
                By accessing or using the Wallet application (&quots;the App&quots;), you agree to be bound by these Terms and Conditions. 
                If you do not agree to these terms, please do not use the App.
            </Text>

            <Text style={styles.sectionTitle}>2. Description of Service</Text>
            <Text style={styles.paragraph}>
                The Wallet App is a financial management tool that allows users to track their personal expenses, 
                income, and manage their financial data. The App is provided on an &quots;as is&quots; and &quots;as available&quots; basis.
            </Text>

            <Text style={styles.sectionTitle}>3. User Registration and Account Security</Text>
            <Text style={styles.paragraph}>
                To use certain features of the App, you may need to create an account. You are responsible for 
                maintaining the confidentiality of your account information and for all activities that occur under your account.
                You agree to notify us immediately of any unauthorized use of your account.
            </Text>

            <Text style={styles.sectionTitle}>4. User Data</Text>
            <Text style={styles.paragraph}>
                The App collects and processes personal information as described in our Privacy Policy. 
                By using the App, you consent to such processing and you represent that all information you provide is accurate.
            </Text>

            <Text style={styles.sectionTitle}>5. Prohibited Uses</Text>
            <Text style={styles.paragraph}>
                You agree not to use the App to:
                {'\n'}- Violate any applicable laws or regulations
                {'\n'}- Infringe upon the rights of others
                {'\n'}- Attempt to gain unauthorized access to the App or its related systems
                {'\n'}- Interfere with or disrupt the App or servers
                {'\n'}- Transmit viruses or other harmful code
            </Text>

            <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
            <Text style={styles.paragraph}>
                The App and its original content, features, and functionality are owned by us and are protected by 
                international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </Text>

            <Text style={styles.sectionTitle}>7. Termination</Text>
            <Text style={styles.paragraph}>
                We may terminate or suspend your account and access to the App immediately, without prior notice, 
                for conduct that we believe violates these Terms or is harmful to other users of the App, us, or third parties,
                or for any other reason at our sole discretion.
            </Text>

            <Text style={styles.sectionTitle}>8. Limitation of Liability</Text>
            <Text style={styles.paragraph}>
                In no event shall we be liable for any indirect, incidental, special, consequential or punitive damages,
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                resulting from your access to or use of or inability to access or use the App.
            </Text>

            <Text style={styles.sectionTitle}>9. Governing Law</Text>
            <Text style={styles.paragraph}>
                These Terms shall be governed by the laws of the jurisdiction in which the App operates,
                without regard to its conflict of law provisions.
            </Text>

            <Text style={styles.sectionTitle}>10. Changes to Terms</Text>
            <Text style={styles.paragraph}>
                We reserve the right to modify these terms at any time. We will provide notice of significant changes 
                by posting the new Terms on the App. Your continued use of the App after such changes constitutes your 
                acceptance of the new Terms.
            </Text>

            <Text style={styles.sectionTitle}>11. Contact Us</Text>
            <Text style={styles.paragraph}>
                If you have any questions about these Terms, please contact us at{' '}
                <Text
                    style={{ color: COLORS.primary, textDecorationLine: 'underline' }}
                    onPress={() => {
                        // Linking is a React Native API to open URLs
                        import('react-native').then(({ Linking }) => {
                            Linking.openURL(`mailto:${process.env.EXPO_PUBLIC_EMAIL_ADDRESS}`);
                        });
                    }}
                >
                    {process.env.EXPO_PUBLIC_EMAIL_ADDRESS}
                </Text>
                .
            </Text>

            <View style={styles.spacing} />
        </ScrollView>
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
  lastUpdated: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
    marginTop: 16,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
    marginBottom: 16,
  },
  spacing: {
    height: 40,
  },
});
