import { getDatabase } from './bd';

export const insertFarmUbication = async (userId, latitude, longitude) => {
    db = await getDatabase();

    await db.runAsync(
        `UPDATE User SET latitude = ?, longitude = ? WHERE id = ?`,
        [latitude, longitude, userId]
    );

    return res;
};

export const getFarmUbicationByUserId = async (userId) => {
    db = await getDatabase();
    const res = await db.getFirstAsync(
        `SELECT latitude, longitude FROM User WHERE id = ?`,
        [userId]
    );
    return res;
};