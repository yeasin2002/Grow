const { getDefaultConfig } = require("expo/metro-config");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");
const { withUniwindConfig } = require("uniwind/metro");
const path = require("path");

// 1. Define your roots
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

/** @type {import("expo/metro-config").MetroConfig} */
const config = getDefaultConfig(projectRoot);

// 2. Watch the entire monorepo so it can see your shared packages
config.watchFolders = [workspaceRoot];

// 3. Force Metro to resolve modules from both the app and the root
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// 4. FIX THE EMFILE ISSUE: Tell Metro to ignore the server and build artifacts
config.resolver.blockList = [
  /.*\/apps\/server\/.*/, // Ignore NestJS backend
  /.*\/dist\/.*/, // Ignore any build outputs
  /.*\/\.turbo\/.*/, // Ignore Turbo cache
];

// 5. Support pnpm symlinks
config.resolver.unstable_enableSymlinks = true;
config.resolver.unstable_enablePackageExports = true;

// 6. Apply your wrappers (Uniwind and Reanimated)
const wrappedConfig = withUniwindConfig(wrapWithReanimatedMetroConfig(config), {
  cssEntryFile: "./src/global.css",
  dtsFile: "./uniwind-types.d.ts",
});

module.exports = wrappedConfig;