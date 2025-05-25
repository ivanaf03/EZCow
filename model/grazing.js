import { getDatabase } from "./bd";

export const insertGroup = async (
    name,
) => {
  const db = await getDatabase();
  try {
    const res = await db.runAsync(
      `INSERT INTO CowGroup (name) VALUES (?)`,
      [name]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};