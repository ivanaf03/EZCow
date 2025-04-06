import { getDatabase } from './bd';

export const insertField = async (name, latitude, longitude, user_fk) => {

    db = await getDatabase();

    try {
        await db.runAsync(
            `INSERT INTO Field (name, latitude, longitude, user_fk) VALUES (?, ?, ?, ?)`,
            [name, latitude, longitude, user_fk]
        );
    } catch (error) {
        console.log(error);
    }
};

export const getAllFieldsByUserId = async (userId) => {
    db = await getDatabase();

    try {
        const res = await db.getAllAsync(
            `SELECT * FROM Field WHERE user_fk = ?`,
            [userId]
        );

        return res;
    } catch (error) {
        console.log(error);
    }
};