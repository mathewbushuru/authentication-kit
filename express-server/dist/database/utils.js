import dbPool from "./index.js";
export async function createUser(username, email, password, emailNotifications, phoneNumber) {
    const response = await dbPool.query(`
        INSERT INTO users (
            username, email, password, phoneNumber, emailNotifications
        ) VALUES (?,?,?,?,?)
    `, [username, email, password, phoneNumber || null, emailNotifications ? 1 : 0]);
    const id = response[0].insertId;
    return getUserById(id);
}
export async function getAllUsers() {
    const dbResponse = await dbPool.query(`SELECT * FROM users;`);
    const allUsersArr = dbResponse[0];
    return allUsersArr;
}
export async function getUserById(id) {
    const dbResponse = await dbPool.query(`
        SELECT * FROM users WHERE id=?;
    `, [id]);
    const userArr = dbResponse[0];
    const user = userArr[0];
    return user;
}
export async function getUserByEmail(email) {
    const dbResponse = await dbPool.query(`
      SELECT * FROM users where email=?;
    `, [email]);
    const userArr = dbResponse[0];
    const user = userArr[0];
    return user;
}
