import { getDatabase } from "../model/bd";

export const insertField = async (name, latitude, longitude, user_fk) => {
  const db = await getDatabase();
  try {
    await db.runAsync(
      `INSERT INTO Field (name, latitude, longitude, user_fk) VALUES (?, ?, ?, ?)`,
      [name, latitude, longitude, user_fk]
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllFieldsByUserId = async (userId) => {
  const db = await getDatabase();
  try {
    const res = await db.getAllAsync(`SELECT * FROM Field WHERE user_fk = ?`, [
      userId,
    ]);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteFieldById = async (id) => {
  const db = await getDatabase();
  try {
    await db.runAsync(`DELETE FROM Field WHERE id = ?`, [id]);
  } catch (error) {
    console.log(error);
    return null;
  }
};
