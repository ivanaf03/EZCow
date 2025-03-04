import * as SQLite from 'expo-sqlite';

export const insertCow = async (code, name, entryDate, gender, breed, user_fk, mother_fk) => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');

    const res = await db.runAsync(
        `INSERT INTO Cow (code, name, entryDate, gender, breed, user_fk, mother_fk) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [code, name, entryDate, gender, breed, user_fk, mother_fk]
    );

    return res;
};

export const getCowIdByCode = async (code) => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');

    const res = await db.getFirstAsync(
        `SELECT id FROM Cow WHERE code = ?`,
        [code]
    );

    return res.id;
};

export const getCowNameById = async (id) => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');

    const res = await db.getFirstAsync(
        `SELECT name FROM Cow WHERE id = ?`,
        [id]
    );

    return res.name;
};

export const getCowCodeByUserId = async (userId) => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');

    const res = await db.getAllAsync(
        `SELECT code FROM Cow WHERE user_fk = ?`,
        [userId]
    );

    return res.map((cow) => cow.code);
};

export const getAllCowsByUserId = async (userId) => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');

    const res = await db.getAllAsync(
        `SELECT * FROM Cow WHERE user_fk = ?`,
        [userId]
    );

    return res;
};
