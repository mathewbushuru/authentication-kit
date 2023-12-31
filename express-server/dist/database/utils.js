import dbPool from "./index.js";
// [ ] Wrap db queries in trycatch
export async function createUser(username, email, hashedPassword, emailNotifications, phoneNumber, emailVerified) {
    const response = await dbPool.query(`
        INSERT INTO authkit_users (
            username, email, hashedPassword, phoneNumber, emailNotifications, emailVerified
        ) VALUES (?,?,?,?,?,?)
    `, [
        username,
        email,
        hashedPassword,
        phoneNumber || null,
        emailNotifications ? 1 : 0,
        emailVerified ? 1 : 0,
    ]);
    const id = response[0].insertId;
    return getUserById(id);
}
export async function getAllUsers() {
    const dbResponse = await dbPool.query(`SELECT * FROM authkit_users;`);
    const allUsersArr = dbResponse[0];
    return allUsersArr;
}
export async function getUserById(id) {
    const dbResponse = await dbPool.query(`
        SELECT * FROM authkit_users WHERE id=?;
    `, [id]);
    const userArr = dbResponse[0];
    let user;
    if (userArr.length) {
        user = userArr[0];
    }
    else {
        user = null;
    }
    return user;
}
export async function getUserByEmail(email) {
    const dbResponse = await dbPool.query(`
      SELECT * FROM authkit_users where email=?;
    `, [email]);
    const userArr = dbResponse[0];
    let user;
    if (userArr.length) {
        user = userArr[0];
    }
    else {
        user = null;
    }
    return user;
}
