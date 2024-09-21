/* declare module "connect-sqlite3" {
  import { Store, SessionData } from "express-session";

  interface SQLiteStoreOptions {
    table?: string;
    db?: string;
    dir?: string;
    concurrentDB?: boolean;
  }

  export default function SQLiteStore(
    session: typeof import("express-session")
  ): new (options: SQLiteStoreOptions) => Store & {
    createSession(sid: string, session: SessionData): SessionData;
  };
} */
