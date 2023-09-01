export default class User {
    constructor(id, username, email, password, phoneNumber, emailNotifications, createdAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.emailNotifications = emailNotifications;
        this.createdAt = createdAt;
    }
    saveToDb() {
        // TODO:  Save user info to database
    }
    updateEmail(newEmail) {
        this.email = newEmail;
        this.saveToDb();
    }
}
