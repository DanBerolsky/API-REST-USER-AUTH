export default interface User {
  id?: number;
  email?: string;
  password?: string;
  token?: string;
  sessionId?: string;
  last_password_update?:string
}
