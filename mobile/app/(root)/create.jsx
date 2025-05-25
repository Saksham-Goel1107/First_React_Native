import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, TextInput } from 'react-native'
import { styles } from '../../assets/styles/create.style'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const CATEGORIES = [
    {
        id: "food",
        name: "Food & Drinks",
        icon: "fast-food"
    },
    {
        id: "shopping",
        name: "Shopping",
        icon: "cart"
    },
    {
        id: "transportation",
        name: "Transportation",
        icon: "car"
    },
    {
        id: "bills",
        name: "Bills",
        icon: "receipt"
    },
    {
        id: "income",
        name: "Income",
        icon: "cash"
    },
    {
        id: "entertainment",
        name: "Entertainment",
        icon: "film"
    },
    {
        id: "other",
        name: "Other",
        icon: "ellipsis-horizontal"
    }
];

// Define amount constraints
const MAX_AMOUNT = parseInt(process.env.EXPO_PUBLIC_MAX_AMOUNT);
const MAX_TITLE_LENGTH = parseInt(process.env.EXPO_PUBLIC_MAX_TITLE_LENGTH);


const CreateScreen = () => {
    const router = useRouter()
    const { user } = useUser()

    const [Title, setTitle] = useState("")
    const [Amount, setAmount] = useState("")
    const [SelectedCategory, setSelectedCategory] = useState("")
    const [IsExpense, setIsExpense] = useState(true)
    const [IsLoading, setIsLoading] = useState(false)
    
    // Amount validation - $1 million maximum transaction limit
    const parsedAmount = parseFloat(Amount);
    const isAmountTooLarge = !isNaN(parsedAmount) && parsedAmount > MAX_AMOUNT;
    
    const handleCreate = async () => {
        if (!Title.trim()) return Alert.alert("Error", "please Enter a Transaction Title");
        if (!Amount || isNaN(parsedAmount) || parsedAmount <= 0) {
            Alert.alert("Error", "Please Enter a valid Transaction Amount");
            return;
        }
        if (isAmountTooLarge) {
            Alert.alert("Error", `Transaction amount cannot exceed $${MAX_AMOUNT.toLocaleString()}`);
            return;
        }
        if (!SelectedCategory) return Alert.alert("Error", "Please Select a Transaction Category");

        setIsLoading(true)
        try {
            const formattedAmount = IsExpense ? -Math.abs(parseFloat(Amount)) : Math.abs(parseFloat(Amount));
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/transactions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: user.id,
                    title: Title,
                    amount: formattedAmount,
                    category: SelectedCategory,
                })
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error("API Response:", errorText);
                throw new Error("Failed to create transaction");
            }
            
            Alert.alert(
                "Success", 
                "Transaction Created Successfully",
                [{ text: "OK", onPress: () => router.back() }]
            );
        } catch (error) {
            Alert.alert("Error", error.message || "Failed to create transaction");
            console.error("Error creating transaction: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            extraScrollHeight={100}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.container}>
                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>New Transaction</Text>

                    <TouchableOpacity
                        style={[
                            styles.saveButtonContainer,
                            (IsLoading || isAmountTooLarge) && styles.saveButtonDisabled
                        ]}
                        onPress={handleCreate}
                        disabled={IsLoading || isAmountTooLarge}
                    >
                        <Text style={styles.saveButton}>
                            {IsLoading ? "Saving..." : "Save"}
                            {!IsLoading && (
                                <Ionicons
                                    name="checkmark"
                                    size={18}
                                    color={COLORS.primary}
                                />
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* types selector */}
                <View style={styles.card}>
                    <View style={styles.typeSelector}>
                        <TouchableOpacity
                            style={[
                                styles.typeButton,
                                IsExpense && styles.typeButtonActive
                            ]}
                            onPress={() => setIsExpense(true)}
                        >
                            <Ionicons
                                name="arrow-down-circle"
                                size={22}
                                color={IsExpense ? COLORS.white : COLORS.expense}
                                style={styles.typeIcon}
                            />
                            <Text
                                style={[
                                    styles.typeButtonText,
                                    IsExpense && styles.typeButtonTextActive
                                ]}
                            >
                                Expense
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.typeButton,
                                !IsExpense && styles.typeButtonActive
                            ]}
                            onPress={() => setIsExpense(false)}
                        >
                            <Ionicons
                                name="arrow-up-circle"
                                size={22}
                                color={!IsExpense ? COLORS.white : COLORS.income}
                                style={styles.typeIcon}
                            />
                            <Text
                                style={[
                                    styles.typeButtonText,
                                    !IsExpense && styles.typeButtonTextActive
                                ]}
                            >
                                Income
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>
                
                {/* Amount Input Card */}
                <View style={styles.card}>
                    <View style={styles.amountContainer}>
                        <Text style={styles.currencySymbol}>$</Text>
                        <TextInput
                            style={[styles.amountInput, isAmountTooLarge && {color: COLORS.expense}]}
                            placeholder="0.00"
                            placeholderTextColor={COLORS.textLight}
                            value={Amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                        />
                    </View>
                    {isAmountTooLarge && (
                        <Text style={{
                            color: COLORS.expense, 
                            fontSize: 12, 
                            marginTop: 5, 
                            textAlign: 'right',
                            fontStyle: 'italic'
                        }}>
                            Amount cannot exceed ${MAX_AMOUNT.toLocaleString()}
                        </Text>
                    )}
                </View>
                
                {/* Title Input */}
                <View style={styles.card}>
                    <View style={styles.inputContainer}>
                        <Ionicons 
                            name="document-text-outline"
                            size={22}
                            color={COLORS.text}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Transaction Title"
                            placeholderTextColor={COLORS.textLight}
                            value={Title}
                            onChangeText={(text) => {
                                // Limit the text to MAX_TITLE_LENGTH characters
                                if (text.length <= MAX_TITLE_LENGTH) {
                                    setTitle(text);
                                }
                            }}
                            maxLength={MAX_TITLE_LENGTH}
                        />
                    </View>
                    <Text style={{
                        color: Title.length >= MAX_TITLE_LENGTH * 0.8 ? COLORS.expense : COLORS.textLight, 
                        fontSize: 11, 
                        marginTop: 5, 
                        textAlign: 'right',
                        fontStyle: 'italic'
                    }}>
                        {Title.length}/{MAX_TITLE_LENGTH} characters
                    </Text>
                    
                    {/* Category Selection */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10,gap:5 }}>
                    <Ionicons
                        name="pricetag"
                        size={18}
                        style={{ marginBottom: 4, marginLeft: 2 }}
                    />
                    <Text style={styles.sectionTitle}>Category</Text></View>
                    <View style={styles.categoryGrid}>
                        {CATEGORIES.map(category => (
                            <TouchableOpacity
                                key={category.id}
                                style={[
                                    styles.categoryButton,
                                    SelectedCategory === category.name && styles.categoryButtonActive
                                ]}
                                onPress={() => setSelectedCategory(category.name)}
                            >
                                <Ionicons
                                    name={category.icon}
                                    size={18}
                                    color={SelectedCategory === category.name ? COLORS.white : COLORS.text}
                                    style={styles.categoryIcon}
                                />
                                <Text
                                    style={[
                                        styles.categoryButtonText,
                                        SelectedCategory === category.name && {color: COLORS.white}
                                    ]}
                                >
                                    {category.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </View>
        </KeyboardAwareScrollView>
    )
}

export default CreateScreen