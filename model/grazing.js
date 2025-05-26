import { getDatabase } from "./bd";

export const insertGroup = async (name) => {
  const db = await getDatabase();
  try {
    const res = await db.runAsync(`INSERT INTO CowGroup (name) VALUES (?)`, [
      name,
    ]);
    return res.lastID;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllGroups = async (userId) => {
  const db = await getDatabase();
  try {
    const res = await db.getAllAsync(
      `SELECT DISTINCT CowGroup.id AS groupId,CowGroup.name AS groupName
       FROM CowGroup JOIN Cow ON CowGroup.id = Cow.group_fk WHERE Cow.user_fk = ?`,
      [userId]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteGroup = async (groupId) => {
  const db = await getDatabase();
  try {
    const res = await db.runAsync(`DELETE FROM CowGroup WHERE id = ?`, [
      groupId,
    ]);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const insertCowInGroup = async (cowId, groupId) => {
  const db = await getDatabase();
  try {
    const res = await db.runAsync(
      `UPDATE Cow SET group_fk = ? WHERE id = ?`,
      [groupId, cowId]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getGroupIdByName = async (name) => {
  const db = await getDatabase();
  try {
    const res = await db.getFirstAsync(
      `SELECT id FROM CowGroup WHERE name = ?`,
      [name]
    );
    return res.id;
  } catch (error) {
    console.log(error);
    return null;
  }
};
