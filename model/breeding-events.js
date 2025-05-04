import { getDatabase } from "../model/bd";

export const insertBreedingEvent = async (
  cow_fk,
  eventName,
  description,
  date
) => {
  const db = await getDatabase();
  try {
    const res = await db.runAsync(
      `INSERT INTO BreedingEvent (cow_fk, eventName, description, date) VALUES (?, ?, ?, ?)`,
      [cow_fk, eventName, description, date]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllBreedingEventsByUserId = async (userId) => {
  const db = await getDatabase();
  try {
    const res = await db.getAllAsync(
      `SELECT * FROM BreedingEvent JOIN Cow ON BreedingEvent.cow_fk = Cow.id WHERE user_fk = ? and exitDate IS NULL`,
      [userId]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};