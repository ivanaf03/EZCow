import * as SQLite from 'expo-sqlite';
import CryptoJS from 'crypto-js';

const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
};

export const insertUser = async (name, email, password) => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');

    const hashedPassword = hashPassword(password);

    const res = await db.runAsync(
        `INSERT INTO User (name, email, password) VALUES (?, ?, ?)`,
        [name, email, hashedPassword]
    );

    return res;
};

export const insertUserGoogle = async (name, email, google_id) => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');

    const res = await db.runAsync(
        `INSERT INTO User (name, email, google_id) VALUES (?, ?, ?)`,
        [name, email, google_id]
    );
    return res;
};

export const getUserByEmail = async (email) => {
    const db = await SQLite.openDatabaseAsync('ezcow.db');
    const res = await db.getFirstAsync(
        `SELECT * FROM User WHERE email = ?`,
        [email]
    );    
    return res;
};



