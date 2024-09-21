import 'express-session';

declare module 'express-session' {
  interface Session {
    sessionId?: string; // Agrega aquí la propiedad que necesites
  }
}
