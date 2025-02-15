import * as SQLite from 'expo-sqlite';

export const initDatabase = async () => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');

    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS User (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT DEFAULT NULL,
            google_id TEXT DEFAULT NULL,
            CHECK (password IS NOT NULL OR google_id IS NOT NULL)
        );
    `);
};
