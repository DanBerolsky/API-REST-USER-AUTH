import passport from "passport";
import googleStrategy from "./authStrategies/googleStrategy";
import microsoftStrategy from "./authStrategies/microsoftStrategy";
import { localStrategy } from "./authStrategies/localStrategy";
import { deserialize, serialize } from "./serializeDeserialize";

passport.serializeUser(serialize);
passport.deserializeUser(deserialize);

// Configurar Passport con la estrategia Local y funciones
passport.use(localStrategy);

// Google Strategy
passport.use(googleStrategy);

// Microsoft Strategy
passport.use(microsoftStrategy);

export default passport;
