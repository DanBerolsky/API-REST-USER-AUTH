import passport from "passport";
import {
  googleStrategy,
} from "./authStrategies/googleStrategy";
import {
  localStrategy,
} from "./authStrategies/localStrategy";
import { deserialize, serialize } from "./serializeDeserialize";

passport.serializeUser(serialize);
passport.deserializeUser(deserialize);


// Configurar Passport con la estrategia Local y funciones
passport.use(localStrategy);


// google Strategy
passport.use(googleStrategy);

export default passport;
