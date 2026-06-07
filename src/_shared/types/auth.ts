export type AuthUser = {
  _id: string;
  email: string;
  username: string;
  profilePicture?: string;
  description?: string;
  discord?: string;
  savedAnime?: string[];
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthContextValue = {
  auth: AuthUser | false;
  setAuth: (user: AuthUser | false) => void;
  isLoading: boolean;
  cookieCheckDone: boolean;
};

export const isAuthUser = (auth: AuthUser | false): auth is AuthUser => {
  return auth !== false;
};

export type JwtPayload = {
  email: string;
};
