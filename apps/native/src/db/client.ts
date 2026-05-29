import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";

// Open (or create) the local grow.db SQLite database
export const expoDb = openDatabaseSync("grow.db");

// Initialize Drizzle ORM client with the local database and schema
export const db = drizzle(expoDb, { schema });
