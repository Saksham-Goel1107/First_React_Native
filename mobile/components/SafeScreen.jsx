import { View, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS } from "@/constants/colors.js"

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  }
});

const SafeScreen = ({ children }) => {
  const insets = useSafeAreaInsets();
  
  // Use useMemo to create dynamic styles that depend on insets
  const containerStyle = useMemo(() => ({
    ...baseStyles.container,
    paddingTop: insets.top,
    paddingBottom: insets.bottom
  }), [insets.top, insets.bottom]);
  
  return (
    <View style={containerStyle}>
      {children}
    </View>
  )
}

export default SafeScreen