import dbPool from "./index.js";
export async function createUser(firstName, lastName, email, password) {
    const response = await dbPool.query(`
        INSERT INTO users (
            firstName, lastName, email, password
        ) VALUES (?,?,?,?)
    `, [firstName, lastName, email, password]);
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
export async function getUserById(id) {
    const dbResponse = await dbPool.query(`
        SELECT * FROM users WHERE id=?;
    `, [id]);
    const user = dbResponse[0];
    return user[0];
}
// const user = getUserById(1);
// console.log(user);
