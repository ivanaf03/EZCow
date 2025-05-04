import { getDatabase } from "../model/bd";

export const insertHealthEvent = async (
  cow_fk,
  eventName,
  description,
  date
) => {
  const db = await getDatabase();
  try {
    const res = await db.runAsync(
      `INSERT INTO HealthEvent (cow_fk, eventName, description, date) VALUES (?, ?, ?, ?)`,
      [cow_fk, eventName, description, date]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllHealthEventsByUserId = async (userId) => {
  const db = await getDatabase();
  try {
    const res = await db.getAllAsync(
      `SELECT * FROM HealthEvent JOIN Cow ON HealthEvent.cow_fk = Cow.id WHERE user_fk = ? and exitDate IS NULL`,
      [userId]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};