import dbPool from "./index.js";

import { userType } from "../models/user.js";

export async function createUser(
  username: string,
  email: string,
  hashedPassword: string,
  emailNotifications: boolean,
  phoneNumber?: string,
  emailVerified?: boolean
) {
  const response: any = await dbPool.query(
    `
        INSERT INTO users (
            username, email, hashedPassword, phoneNumber, emailNotifications, emailVerified
        ) VALUES (?,?,?,?,?,?)
    `,
    [
      username,
      email,
      hashedPassword,
      phoneNumber || null,
      emailNotifications ? 1 : 0,
      emailVerified ? 1 : 0,
    ]
  );
  const id = response[0].insertId;
  return getUserById(id);
}

export async function getAllUsers() {
  const dbResponse = await dbPool.query(`SELECT * FROM users;`);
  const allUsersArr = dbResponse[0] as unknown as userType[];
  return allUsersArr;
}

export async function getUserById(id: number) {
  const dbResponse = await dbPool.query(
    `
        SELECT * FROM users WHERE id=?;
    `,
    [id]
  );
  const userArr = dbResponse[0] as unknown as userType[];
  let user: userType | null;
  if (userArr.length) {
    user = userArr[0];
  } else {
    user = null;
  }
  return user;
}

export async function getUserByEmail(email: string) {
  const dbResponse = await dbPool.query(
    `
      SELECT * FROM users where email=?;
    `,
    [email]
  );
  const userArr = dbResponse[0] as unknown as userType[];
  let user: userType | null;
  if (userArr.length) {
    user = userArr[0];
  } else {
    user = null;
  }
  return user;
}
