export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  emailNotifications: boolean;
  createdAt: string;
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
