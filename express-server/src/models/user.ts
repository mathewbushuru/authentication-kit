export interface userType {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export default class User implements userType {
  public readonly id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: string;

  constructor(
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    createdAt: string
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = createdAt;
  }

  saveToDb() {
    // TODO:  Save user info to database
  }

  updateEmail(newEmail: string) {
    this.email = newEmail;
    this.saveToDb();
  }
}
