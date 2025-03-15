import CryptoJS from 'crypto-js';
import { getDatabase } from './bd';

const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
};

export const insertUser = async (name, email, password) => {

    db = await getDatabase();

    const hashedPassword = hashPassword(password);

    const res = await db.runAsync(
        `INSERT INTO User (name, email, password) VALUES (?, ?, ?)`,
        [name, email, hashedPassword]
    );

    return res;
};

export const insertUserGoogle = async (name, email, google_id) => {
    
    db = await getDatabase();

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
};

export const getUserByEmail = async (email) => {
    
    db = await getDatabase();
    
    const res = await db.getFirstAsync(
        `SELECT * FROM User WHERE email = ?`,
        [email]
    );

    return res;
};



