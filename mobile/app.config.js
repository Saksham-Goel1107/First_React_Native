export default {
  expo: {
    name: "Wallet",
    slug: "Wallet",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/logo.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.wallet.app"
    },    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/logo.png",
        backgroundColor: "#ffffff"
      },
      package: "com.wallet.app",
      versionCode: 1,
      permissions: []
    },
    web: {
      favicon: "./assets/images/favicon.png"
    },
    extra: {
      clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
      eas: {
        projectId: "b939fc42-e869-41ae-9d22-4eadbd7132f9"
      }
    },    updates: {
      url: "https://u.expo.dev/b939fc42-e869-41ae-9d22-4eadbd7132f9",
      enabled: true,
      fallbackToCacheTimeout: 0,
      checkAutomatically: "ON_LOAD"
    },
    runtimeVersion: {
      policy: "sdkVersion"
    }
  }
};
