import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const PageLoader = () => {
    return (
        <View style={styles.absoluteContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    absoluteContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        zIndex: 999,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: '500',
        letterSpacing: 1,
    },
});

export default PageLoader;
