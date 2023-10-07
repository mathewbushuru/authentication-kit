export default class User {
    constructor(id, username, email, hashedPassword, phoneNumber, emailNotifications, createdAt, updateddAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.phoneNumber = phoneNumber;
        this.emailNotifications = emailNotifications;
        this.createdAt = createdAt;
        this.updatedAt = updateddAt;
    }
    saveToDb() {
        // [ ]  Save user info to database
    }
    updateEmail(newEmail) {
        this.email = newEmail;
        this.saveToDb();
    }
}
