export default class User {
    constructor(id, email, password, firstName, lastName) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    saveToDb() {
        // TODO:  Save user info to database
    }
    updateEmail(newEmail) {
        this.email = newEmail;
        this.saveToDb();
    }
}
