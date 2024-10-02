export default interface User {
  id: number;
  email: string;
  password: string;
  token: string;
  sessionId: string;
  last_password_update: string;
}

// Tipos específicos
export type UserAuthenticate = Pick<User, "email" | "password">;
export type UserEmail = Pick<User, "email">;
export type UserSession = Pick<User, "email" | "sessionId">;
export type UserSignup = Pick<User, "email" | "password">;
export type UserJWTRequest = Pick<User, "email" | "token">;
export type UserPayload = Pick<User,"email" | "last_password_update">
