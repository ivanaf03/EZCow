import * as SQLite from 'expo-sqlite';

export const insertCow = async (code, name, entryDate, gender, breed, user_fk, mother_fk) => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');

    const res = await db.runAsync(
        `INSERT INTO Cow (code, name, entryDate, gender, breed, user_fk, mother_fk) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [code, name, entryDate, exitDate, gender, breed, user_fk, mother_fk]
    );

    return res;
};