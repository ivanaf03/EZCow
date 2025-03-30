import { getDatabase } from './bd';

export const insertCow = async (code, name, entryDate, gender, breed, phase, user_fk, mother_fk) => {

    db = await getDatabase();

    const res = await db.runAsync(
        `INSERT INTO Cow (code, name, entryDate, gender, breed, phase, user_fk, mother_fk) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [code, name, entryDate, gender, breed, phase, user_fk, mother_fk]
    );

    return res;
};

export const getCowIdByCode = async (code) => {

    db = await getDatabase();

    const res = await db.getFirstAsync(
        `SELECT id FROM Cow WHERE code = ?`,
        [code]
    );

    return res.id;
};

export const getAvailableCowNameById = async (id) => {

    db = await getDatabase();

    const res = await db.getFirstAsync(
        `SELECT name FROM Cow WHERE id = ? AND exitDate is NULL`,
        [id]
    );

    return res.name;
};

export const getAvailableCowCodeByUserId = async (userId) => {

    db = await getDatabase();

    const res = await db.getAllAsync(
        `SELECT code FROM Cow WHERE user_fk = ? AND exitDate is NULL AND gender='Femenino' AND phase='Adulto'`,
        [userId]
    );

    return res.map((cow) => cow.code);
};

export const getAllCowsAvailableByUserId = async (userId) => {

    db = await getDatabase();

    const res = await db.getAllAsync(
        `SELECT * FROM Cow WHERE user_fk = ? AND exitDate is NULL`,
        [userId]
    );

    return res;
};

export const getAllCowsAvailableByUserIdAndPhaseAndGender = async (userId, phase, gender) => {
    
    db = await getDatabase();

    const res = await db.getAllAsync(
        `SELECT * FROM Cow WHERE user_fk = ? AND exitDate is NULL AND phase = ? AND gender = ?`,
        [userId, phase, gender]
    );

    return res;
};

export const getCalvesAvailableByUserId = async (userId) => {

    db = await getDatabase();

    const res = await db.getAllAsync(
        `SELECT * FROM Cow WHERE user_fk = ? AND exitDate is NULL AND phase = 'Ternero'`,
        [userId]
    );

    return res;
};

export const setExitDateByCowId = async (cowId) => {

    db = await getDatabase();


    const res = await db.runAsync(
        `UPDATE Cow SET exitDate = CURRENT_DATE WHERE id = ?`,
        [cowId]
    );

    return res;
};

export const getAllCowsExitedByUserIdAndPhaseAndGender = async (userId, phase, gender) => {

    db = await getDatabase();

    const res = await db.getAllAsync(
        `SELECT * FROM Cow WHERE user_fk = ? AND exitDate is NOT NULL AND phase = ? AND gender = ?`,
        [userId, phase, gender]
    );

    return res;
};

export const getAllCowsExitedByUserId = async (userId) => {

    db = await getDatabase();

    const res = await db.getAllAsync(
        `SELECT * FROM Cow WHERE user_fk = ? AND exitDate is NOT NULL`,
        [userId]
    );

    return res;
};

export const getAllCalvesExitedByUserId = async (userId) => {

    db = await getDatabase();

    const res = await db.getAllAsync(
        `SELECT * FROM Cow WHERE user_fk = ? AND exitDate is NOT NULL AND phase = 'Ternero'`,
        [userId]
    );

    return res;
};