export interface userType {
  id: number;
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  emailNotifications: boolean;
  createdAt: string;
}

export default class User implements userType {
  public readonly id: number;
  username: string;
  email: string;
  password: string;
  phoneNumber: string | undefined;
  emailNotifications: boolean;
  createdAt: string;

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    phoneNumber: string | undefined,
    emailNotifications: boolean,
    createdAt: string
  ) {
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

  updateEmail(newEmail: string) {
    this.email = newEmail;
    this.saveToDb();
  }
}
