import session, { SessionOptions } from "express-session";
import config from "../../config/express-session"

export default session(config as SessionOptions)