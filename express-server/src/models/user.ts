export interface userType {
  id: number;
  username: string;
  email: string;
  hashedPassword: string;
  phoneNumber?: string;
  emailNotifications: boolean;
  createdAt: string;
  updatedAt: string;
}

export default class User implements userType {
  public readonly id: number;
  username: string;
  email: string;
  hashedPassword: string;
  phoneNumber: string | undefined;
  emailNotifications: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(
    id: number,
    username: string,
    email: string,
    hashedPassword: string,
    phoneNumber: string | undefined,
    emailNotifications: boolean,
    createdAt: string,
    updateddAt: string
  ) {
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

  updateEmail(newEmail: string) {
    this.email = newEmail;
    this.saveToDb();
  }
}
