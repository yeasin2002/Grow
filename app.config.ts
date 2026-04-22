import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  scheme: "grow",
  userInterfaceStyle: "automatic",
  orientation: "default",
  name: "Grow",
  slug: "Grow",

  splash: {
    image: "./src/assets/logo.png",
    resizeMode: "contain",
    backgroundColor: "#F1F1F1",
  },

  web: {
    bundler: "metro",
  },

  plugins: ["expo-font"],

  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
});