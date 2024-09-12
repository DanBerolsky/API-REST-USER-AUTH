const passport = require('passport')
const {localStrategy, deserializeUser, serializeUser} = require('./authStrategies/localStrategy')

// Configurar Passport con la estrategia y funciones
passport.use(localStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

module.exports = {passport}