import { DoneCallback, Profile } from "passport";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";

// Configuración de Passport con la estrategia de Microsoft
export default new MicrosoftStrategy(
  {
    clientID: process.env.MICROSOFT_CLIENT_ID as string,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
    callbackURL: process.env.MICROSOFT_CALLBACK_URL as string,
    scope: ["user.read"],
  },
  async (accessToken:any, refreshToken:any, profile:Profile, done:DoneCallback)=>{
    // Aquí puedes manejar el perfil del usuario
    return done(null, profile);
  }
);
