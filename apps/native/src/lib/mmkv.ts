/**
 * Zustand-compatible async storage adapter using expo-secure-store.
 * Works in both Expo Go and native builds without requiring a native compile step.
 * MMKV is kept as a dependency for future use in native-only code paths.
 */
import * as SecureStore from "expo-secure-store";

export const secureStoreZustandStorage = {
	getItem: (name: string): Promise<string | null> =>
		SecureStore.getItemAsync(name),

	setItem: (name: string, value: string): Promise<void> =>
		SecureStore.setItemAsync(name, value),

	removeItem: (name: string): Promise<void> =>
		SecureStore.deleteItemAsync(name),
};
