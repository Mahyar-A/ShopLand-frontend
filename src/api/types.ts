export type LoginType = {
  email: string;
  password: string;
};

export type SignupType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserType = {
  userId: string;
  fullName: string;
  email: string;
  roles: ("Admin" | "Customer")[];
};

export type AuthTokenType = {
  accessToken: string;
  refreshToken: string;
};
