export type User = {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  emailNotifications: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LoginRequestType = {
  email: string;
  password: string;
};

export type SignupRequestType = {
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  emailNotifications: boolean;
};
