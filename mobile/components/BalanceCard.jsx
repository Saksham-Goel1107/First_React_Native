import { View, Text, StyleSheet } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

const BalanceCard = ({ summary }) => {
    const balance = parseFloat(summary?.balance || 0);
    const balanceColor = balance >= 0 ? COLORS.income : COLORS.expense;

    return (
        <View style={styles.balanceCard}>
            <Text style={styles.balanceTitle}>Total Balance</Text>
            <Text style={[styles.balanceAmount, { color: balanceColor }]}>
                ${balance.toFixed(2)}
            </Text>
            <View style={styles.balanceStats}>
                <View style={[styles.balanceStatItem, cardStyles.statColumn]}>
                    <Text style={styles.balanceStatLabel}>Income</Text>
                    <Text 
                        style={[styles.balanceStatAmount, { color: COLORS.income }]}
                        numberOfLines={1} 
                        adjustsFontSizeToFit={true}
                    >
                        +${parseFloat(summary?.income || 0).toFixed(2)}
                    </Text>
                </View>
                <View style={[styles.balanceStatItem, styles.statDivider]} />
                <View style={[styles.balanceStatItem, cardStyles.statColumn]}>
                    <Text style={styles.balanceStatLabel}>Expenses</Text>
                    <Text 
                        style={[styles.balanceStatAmount, { color: COLORS.expense }]}
                        numberOfLines={1}
                        adjustsFontSizeToFit={true}
                    >
                        -${Math.abs(parseFloat(summary?.expense || 0)).toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const cardStyles = StyleSheet.create({
    statColumn: {
        flex: 1,
        minWidth: 90,
        paddingHorizontal: 5,
        alignItems: 'center',
    }
});

export default BalanceCard;
