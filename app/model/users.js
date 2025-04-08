import CryptoJS from "crypto-js";
import { getDatabase } from "./bd";

const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};

export const insertUser = async (name, email, password) => {
  const db = await getDatabase();
  const hashedPassword = hashPassword(password);
  try {
    const res = await db.runAsync(
      `INSERT INTO User (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const insertUserGoogle = async (name, email, google_id) => {
  const db = await getDatabase();
  try {
    const existingUser = await db.getFirstAsync(
      `SELECT * FROM User WHERE email = ?`,
      [email]
    );
    if (existingUser) {
      return existingUser;
    }
    const res = await db.runAsync(
      `INSERT INTO User (name, email, google_id) VALUES (?, ?, ?)`,
      [name, email, google_id]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserByEmail = async (email) => {
  const db = await getDatabase();
  try {
    const res = await db.getFirstAsync(`SELECT * FROM User WHERE email = ?`, [
      email,
    ]);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const changePassword = async (email, password) => {
  const db = await getDatabase();
  const hashedPassword = hashPassword(password);
  try {
    const res = await db.runAsync(
      `UPDATE User SET password = ? WHERE email = ?`,
      [hashedPassword, email]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
