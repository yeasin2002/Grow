import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import * as SQLite from "expo-sqlite";
import migrations from "../../drizzle/migrations";

// Open or create local DB file
const _db = SQLite.openDatabase("db.db");

export const db = drizzle(_db as any);

export async function runMigrations() {
	try {
		await migrate(db, migrations as any);
		// eslint-disable-next-line no-console
		console.log("Drizzle migrations applied");
	} catch (err) {
		// eslint-disable-next-line no-console
		console.warn("Failed to run migrations", err);
	}
}
