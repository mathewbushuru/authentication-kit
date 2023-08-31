import dbPool from "./index.js";

export async function createUser(
  username: string,
  email: string,
  password: string,
  emailNotifications: boolean,
  phoneNumber?: string
) {
  const response: any = await dbPool.query(
    `
        INSERT INTO users (
            username, email, password, phoneNumber, emailNotifications
        ) VALUES (?,?,?,?,?)
    `,
    [username, email, password, phoneNumber || null, emailNotifications ? 1 : 0]
  );
  const id = response[0].insertId;
  return getUserById(id);
}
// const createdUser = await createUser("Mathew", "B", "matt@test.com", "tester123");
// console.log(createdUser);

export async function getAllUsers() {
  const dbResponse = await dbPool.query(`SELECT * FROM users;`);
  const allUsers = dbResponse[0];
  return allUsers;
}
// const allUsers = await getAllUsers();
// console.log(allUsers);

export async function getUserById(id: number) {
  const dbResponse = await dbPool.query(
    `
        SELECT * FROM users WHERE id=?;
    `,
    [id]
  );
  const user: any = dbResponse[0];
  return user[0];
}
// const user = getUserById(1);
// console.log(user);
