import { getDatabase } from "./bd";

export const insertFarmUbication = async (userId, latitude, longitude) => {
  const db = await getDatabase();
  try {
    const res = await db.runAsync(
      `UPDATE User SET latitude = ?, longitude = ? WHERE id = ?`,
      [latitude, longitude, userId]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFarmUbicationByUserId = async (userId) => {
  const db = await getDatabase();
  try {
    const res = await db.getFirstAsync(
      `SELECT latitude, longitude FROM User WHERE id = ?`,
      [userId]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
