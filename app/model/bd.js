import * as SQLite from 'expo-sqlite';

export const initDatabase = async () => {
    const db = await SQLite.openDatabaseAsync('excow.db');

    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS "User" (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            google_id TEXT NOT NULL
        );
    `);
};
