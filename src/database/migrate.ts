import pgPromise from "pg-promise";
import fs from "fs";
import path from "path";
import db from "./dbConfig";
import { fileURLToPath } from "url";

const pgp = pgPromise();

const currentFilePath = fileURLToPath(import.meta.url);
const migrationsDir = path.join(path.dirname(currentFilePath), "migrations");

async function runMigrations() {
  try {
    const files = fs.readdirSync(
      migrationsDir
    ).filter(file => file.endsWith(".sql"));
    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, "utf-8");
      await db.none(sql);
      console.log(`Successfully applied migration: ${file}`);
    }

    console.log("All migrations applied successfully.");
  } catch (error) {
    console.error("Error applying migrations:", error);
  } finally {
    pgp.end();
  }
}

runMigrations();
