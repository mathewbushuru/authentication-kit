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
    const allUsers = dbResponse[0];
    return allUsers;
}
export async function getUserById(id) {
    const dbResponse = await dbPool.query(`
        SELECT * FROM users WHERE id=?;
    `, [id]);
    const user = dbResponse[0];
    return user[0];
}
