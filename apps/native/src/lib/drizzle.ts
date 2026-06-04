
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

export const expoDb = openDatabaseSync("database.db");
export const db = drizzle(expoDb);

// Drizzle / expo-sqlite integration stub
// This file intentionally avoids importing `drizzle-orm` or `expo-sqlite`
// at module-init time to prevent Metro from trying to resolve/watch
// those packages when they are not fully installed.

// export async function runMigrations(): Promise<void> {
// 	// No-op placeholder. If you install and enable Drizzle later,
// 	// replace this implementation to open the DB and run migrations.
// 	// Keep this function async so callers can await safely.
// 	// eslint-disable-next-line no-console
// 	console.info("Drizzle migrations are disabled in this build.");
// }
