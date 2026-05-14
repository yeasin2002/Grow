import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  scheme: "grow",
  userInterfaceStyle: "automatic",
  orientation: "default",
  name: "Grow",
  slug: "Grow",
  android: {
    package: "com.yeasin2002.dev.Grow",
  },

  splash: {
    image: "./src/assets/logo.png",
    resizeMode: "contain",
    backgroundColor: "#F1F1F1",
  },

  web: {
    bundler: "metro",
  },

  plugins: ["expo-font", "expo-web-browser", "expo-router"],

  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
});
