import * as SQLite from "expo-sqlite";

let db;

export const getDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("ezcow.db");
  }
  return db;
};

export const initDatabase = async () => {
  db = await getDatabase();

  await db.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS User (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT DEFAULT NULL,
            google_id TEXT DEFAULT NULL,
            latitude REAL DEFAULT 43.0,
            longitude REAL DEFAULT -7.0,
            CHECK (password IS NOT NULL OR google_id IS NOT NULL)
        );

        CREATE TABLE IF NOT EXISTS Cow (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            entryDate DATE NOT NULL,
            exitDate DATE DEFAULT NULL,
            gender TEXT NOT NULL,
            breed TEXT NOT NULL,
            phase TEXT NOT NULL,
            user_fk INTEGER NOT NULL,
            mother_fk INTEGER DEFAULT NULL,
            FOREIGN KEY(user_fk) REFERENCES User(id),
            FOREIGN KEY(mother_fk) REFERENCES Cow(id)
        );

        CREATE TABLE IF NOT EXISTS Field (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            latitude REAL DEFAULT 43.0,
            longitude REAL DEFAULT -7.0,
            user_fk INTEGER NOT NULL,
            FOREIGN KEY(user_fk) REFERENCES User(id)
        );

        CREATE TABLE IF NOT EXISTS BreedingEvent (
            if INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            date DATE NOT NULL,
            cow_fk INTEGER NOT NULL,
            FOREIGN KEY(cow_fk) REFERENCES Cow(id)
        );
    `);
};

export const deleteDatabase = async () => {
  await db.closeAsync();
  await SQLite.deleteDatabaseAsync("ezcow.db");
};

export const closeDatabase = async () => {
  await db.closeAsync();
  db = null;
};

export const syncDatabase = async () => {
  await db.execAsync(`
        PRAGMA wal_checkpoint(FULL);
    `);
};
