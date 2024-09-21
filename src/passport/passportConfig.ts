import passport from 'passport';
import { localStrategy, deserializeUser, serializeUser } from './authStrategies/localStrategy';

// Configurar Passport con la estrategia y funciones
passport.use(localStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

export default passport