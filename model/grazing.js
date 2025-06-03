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
       FROM CowGroup JOIN Cow ON CowGroup.id = Cow.group_fk WHERE Cow.user_fk = ? AND CowGroup.exitDate IS NULL`,
      [userId]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setExitDateByGroupId = async (groupId) => {
  const db = await getDatabase();
  try {
    const res = await db.runAsync(
      `UPDATE CowGroup SET exitDate = CURRENT_DATE WHERE id = ?`,
      [groupId]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const insertCowInGroup = async (cowId, groupId) => {
  const db = await getDatabase();
  try {
    const res = await db.runAsync(`UPDATE Cow SET group_fk = ? WHERE id = ?`, [
      groupId,
      cowId,
    ]);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCowsInGroup = async (groupId) => {
  const db = await getDatabase();
  try {
    const res = await db.getAllAsync(
      `SELECT Cow.id AS cowId,Cow.name AS cowName,Cow.code AS cowCode,Cow.group_fk AS groupId
       FROM Cow WHERE group_fk = ?`,
      [groupId]
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const insertGrazing = async (fieldId, groupId) => {
  const db = await getDatabase();
  try {
    const res = await db.runAsync(`INSERT INTO Grazing (field_fk, group_fk, initialDate) VALUES (?, ?, CURRENT_DATE)`, [
      fieldId,
      groupId,
    ]);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFieldIdByName = async (name) => {
  const db = await getDatabase();
  try {
    const res = await db.getFirstAsync(
      `SELECT id FROM Field WHERE name = ?`,
      [name]
    );
    return res.id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFieldNames = async (userId) => {
  const db = await getDatabase();
  try {
    const res = await db.getAllAsync(
      `SELECT name FROM Field WHERE user_fk = ?`,
      [userId]
    );
    return res.map((field) => field.name);
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

export const getGroupNames = async (userId) => {
  const db = await getDatabase();
  try {
    const res = await db.getAllAsync(
      `SELECT DISTINCT CowGroup.name AS groupName FROM CowGroup JOIN Cow ON CowGroup.id = Cow.group_fk WHERE Cow.user_fk = ? AND CowGroup.exitDate IS NULL`,
      [userId]
    );
    return res.map((group) => group.groupName);
  } catch (error) {
    console.log(error);
    return null;
  }
};

