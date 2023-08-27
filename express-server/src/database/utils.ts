import dbPool from "./index.js";

export async function getAllUsers() {
  const dbResponse = await dbPool.query(`SELECT * FROM USERS;`);
  const allUsers = dbResponse[0];
  return allUsers;
}
