import * as SQLite from 'expo-sqlite';

export const insertCow = async (code, name, entryDate, gender, breed, phase, user_fk, mother_fk) => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');

    const res = await db.runAsync(
        `INSERT INTO Cow (code, name, entryDate, gender, breed, phase, user_fk, mother_fk) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [code, name, entryDate, gender, breed, phase, user_fk, mother_fk]
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

export const getAvailableCowNameById = async (id) => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');

    const res = await db.getFirstAsync(
        `SELECT name FROM Cow WHERE id = ? AND exitDate is NULL`,
        [id]
    );

    return res.name;
};

export const getAvailableCowCodeByUserId = async (userId) => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');

    const res = await db.getAllAsync(
        `SELECT code FROM Cow WHERE user_fk = ? and exitDate is NULL`,
        [userId]
    );

    return res.map((cow) => cow.code);
};

export const getAllCowsAvailableByUserId = async (userId) => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');

    const res = await db.getAllAsync(
        `SELECT * FROM Cow WHERE user_fk = ? AND exitDate is NULL`,
        [userId]
    );

    return res;
};

export const getFemaleCowsAvailableByUserId = async (userId) => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');

    const res = await db.getAllAsync(
        `SELECT * FROM Cow WHERE user_fk = ? AND exitDate is NULL AND gender = 'Femenino' AND phase = 'Adulto'`,
        [userId]
    );

    return res;
};

export const getMaleCowsAvailableByUserId = async (userId) => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');

    const res = await db.getAllAsync(
        `SELECT * FROM Cow WHERE user_fk = ? AND exitDate is NULL AND gender = 'Masculino' AND phase = 'Adulto'`,
        [userId]
    );

    return res;
};

export const getCalvesAvailableByUserId = async (userId) => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');

    const res = await db.getAllAsync(
        `SELECT * FROM Cow WHERE user_fk = ? AND exitDate is NULL AND phase = 'Ternero'`,
        [userId]
    );

    return res;
};

export const setExitDateByCowId = async (cowId) => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');

    const res = await db.runAsync(
        `UPDATE Cow SET exitDate = CURRENT_DATE WHERE id = ?`,
        [cowId]
    );

    return res;
};
