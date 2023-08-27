export interface userType {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default class User implements userType {
  public readonly id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  constructor(
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  saveToDb() {
    // TODO:  Save user info to database
  }

  updateEmail(newEmail: string) {
    this.email = newEmail;
    this.saveToDb();
  }
}
