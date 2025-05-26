import { getDatabase } from "../model/bd";

export const insertCow = async (
  code,
  name,
  entryDate,
  gender,
  breed,
  phase,
  user_fk,
  mother_fk
) => {
  const db = await getDatabase();
  try {
    const res = await db.runAsync(
      `INSERT INTO Cow (code, name, entryDate, gender, breed, phase, user_fk, mother_fk) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [code, name, entryDate, gender, breed, phase, user_fk, mother_fk]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCowIdByCode = async (code) => {
  const db = await getDatabase();
  try {
    const res = await db.getFirstAsync(`SELECT id FROM Cow WHERE code = ?`, [
      code,
    ]);
    return res.id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAvailableCowNameById = async (id) => {
  const db = await getDatabase();
  try {
    const res = await db.getFirstAsync(
      `SELECT name FROM Cow WHERE id = ? AND exitDate is NULL`,
      [id]
    );
    return res.name;
    } catch (error) {
      console.log(error);
      return null;
    }
};

export const getAvailableCowCodeByUserId = async (userId) => {
  const db = await getDatabase();
  try {
    const res = await db.getAllAsync(
      `SELECT code FROM Cow WHERE user_fk = ? AND exitDate is NULL AND gender='Femenino' AND phase='Adulto'`,
      [userId]
    );
    return res.map((cow) => cow.code);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAvailableCodeByUserId = async (userId) => {
  const db = await getDatabase();
  try {
    const res = await db.getAllAsync(
      `SELECT code FROM Cow WHERE user_fk = ? AND exitDate is NULL`,
      [userId]
    );
    return res.map((cow) => cow.code);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllCowsAvailableByUserId = async (userId) => {
  const db = await getDatabase();
  try {
    const res = await db.getAllAsync(
      `SELECT * FROM Cow WHERE user_fk = ? AND exitDate is NULL`,
      [userId]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllCowsAvailableByUserIdAndPhaseAndGender = async (
  userId,
  phase,
  gender
) => {
  const db = await getDatabase();
  try {
    const res = await db.getAllAsync(
      `SELECT * FROM Cow WHERE user_fk = ? AND exitDate is NULL AND phase = ? AND gender = ?`,
      [userId, phase, gender]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCalvesAvailableByUserId = async (userId) => {
  const db = await getDatabase();
  try {
    const res = await db.getAllAsync(
      `SELECT * FROM Cow WHERE user_fk = ? AND exitDate is NULL AND phase = 'Ternero'`,
      [userId]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setExitDateByCowId = async (cowId) => {
  const db = await getDatabase();
  try {
    const res = await db.runAsync(
      `UPDATE Cow SET exitDate = CURRENT_DATE WHERE id = ?`,
      [cowId]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllCowsExitedByUserIdAndPhaseAndGender = async (
  userId,
  phase,
  gender
) => {
  const db = await getDatabase();
  try {
    const res = await db.getAllAsync(
      `SELECT * FROM Cow WHERE user_fk = ? AND exitDate is NOT NULL AND phase = ? AND gender = ?`,
      [userId, phase, gender]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllCowsExitedByUserId = async (userId) => {
  const db = await getDatabase();
  try {
    const res = await db.getAllAsync(
      `SELECT * FROM Cow WHERE user_fk = ? AND exitDate is NOT NULL`,
      [userId]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllCalvesExitedByUserId = async (userId) => {
  const db = await getDatabase();
  try {
    const res = await db.getAllAsync(
      `SELECT * FROM Cow WHERE user_fk = ? AND exitDate is NOT NULL AND phase = 'Ternero'`,
      [userId]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllCowIdsAndNamesAvailableByUserId = async (userId) => {
  const db = await getDatabase();
  try {
    const res = await db.getAllAsync(
      `SELECT id, name FROM Cow WHERE user_fk = ? AND exitDate is NULL`,
      [userId]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
