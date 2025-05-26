import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

export default function PrivacyPolicy() {
    const router = useRouter();

    const handleEmailPress = () => {
        // Use Linking to open the mail app
        import('react-native').then(({ Linking }) => {
            Linking.openURL(`mailto:${process.env.EXPO_PUBLIC_EMAIL_ADDRESS}`);
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy Policy</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.lastUpdated}>Last Updated: May 25, 2025</Text>

                <Text style={styles.paragraph}>
                    This Privacy Policy describes how your personal information is collected, used, and shared when you use
                    the Wallet application (&quots;the App&quots;).
                </Text>

                <Text style={styles.sectionTitle}>1. Information We Collect</Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Personal Information:</Text> When you create an account, we collect your name, email address, and password.
                    {'\n\n'}
                    <Text style={styles.bold}>Transaction Data:</Text> We collect information about your financial transactions when you input them into the App.
                    {'\n\n'}
                    <Text style={styles.bold}>Usage Information:</Text> We collect information about how you interact with the App, including access times, pages viewed, and app crashes.
                    {'\n\n'}
                    <Text style={styles.bold}>Device Information:</Text> We collect information about your mobile device, including device model, operating system, unique device identifiers, and mobile network information.
                </Text>

                <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
                <Text style={styles.paragraph}>
                    We use the information we collect to:
                    {'\n'}- Provide, maintain, and improve the App
                    {'\n'}- Process and manage your account
                    {'\n'}- Respond to your comments and questions
                    {'\n'}- Send you technical notices and updates
                    {'\n'}- Detect and prevent fraudulent or illegal activities
                    {'\n'}- Analyze usage patterns and improve user experience
                </Text>

                <Text style={styles.sectionTitle}>3. Sharing Your Information</Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Third-Party Service Providers:</Text> We share your information with third-party vendors and service providers who need access to your information to provide services to us, such as Clerk for authentication services.
                    {'\n\n'}
                    <Text style={styles.bold}>Legal Requirements:</Text> We may disclose your information if required by law or in response to valid requests from public authorities.
                    {'\n\n'}
                    <Text style={styles.bold}>Business Transfers:</Text> If we are involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.
                </Text>

                <Text style={styles.sectionTitle}>4. Data Security</Text>
                <Text style={styles.paragraph}>
                    We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
                </Text>

                <Text style={styles.sectionTitle}>5. Authentication Services</Text>
                <Text style={styles.paragraph}>
                    Our App uses Clerk for authentication purposes. When you sign up or log in, your authentication data is processed by Clerk according to their privacy policy. For more information, please visit Clerk&apos;s privacy policy at https://clerk.dev/privacy.
                </Text>

                <Text style={styles.sectionTitle}>6. Your Data Rights</Text>
                <Text style={styles.paragraph}>
                    Depending on your location, you may have certain rights regarding your personal information, such as the right to:
                    {'\n'}- Access the personal information we hold about you
                    {'\n'}- Request correction of inaccurate information
                    {'\n'}- Request deletion of your information
                    {'\n'}- Object to our processing of your information
                    {'\n'}- Request restriction of processing
                    {'\n'}- Request data portability
                </Text>

                <Text style={styles.sectionTitle}>7. Children&apos;s Privacy</Text>
                <Text style={styles.paragraph}>
                    The App is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13.
                </Text>

                <Text style={styles.sectionTitle}>8. Changes to This Privacy Policy</Text>
                <Text style={styles.paragraph}>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quots;Last Updated&quots; date.
                </Text>

                <Text style={styles.sectionTitle}>9. Contact Us</Text>
                <Text style={styles.paragraph}>
                    If you have questions about this Privacy Policy, please contact us at{' '}
                    <Text style={{ color: COLORS.primary, textDecorationLine: 'underline' }} onPress={handleEmailPress}>
                        {process.env.EXPO_PUBLIC_EMAIL_ADDRESS}
                    </Text>.
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
    bold: {
        fontWeight: '600',
    },
    spacing: {
        height: 40,
    },
});
