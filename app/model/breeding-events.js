import { getDatabase } from "./bd";

export const insertBreedingEvent = async (
  cow_fk,
  description,
  date,
  user_fk
) => {
  const db = await getDatabase();
  try {
    const res = await db.runAsync(
      `INSERT INTO BreedingEvent (cow_fk, description, date, user_fk) VALUES (?, ?, ?, ?)`,
      [cow_fk, description, date, user_fk]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getBreedingEventsByDayAnUserId = async (day, userId) => {
  const db = await getDatabase();
  try {
    const res = await db.getAllAsync(
      `SELECT * FROM BreedingEvent JOIN Cow ON BreedingEvent.cow_fk = Cow.id WHERE date = ? AND user_fk = ?`,
      [userId, day]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};