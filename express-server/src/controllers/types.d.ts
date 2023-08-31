export interface LoginDataType {
  id: string;
  email: string;
  password: string;
}

export interface SignupDataType {
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  emailNotifications: boolean;
}
