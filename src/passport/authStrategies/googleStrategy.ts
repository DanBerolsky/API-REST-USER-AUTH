import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import GoogleProfile from "../../types/google";
import { addUser, findByEmail } from "../../models/UserModel";
import User, { UserSignup } from "../../types/user";

const clientID = process.env.GOOGLE_CLIENT_ID as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const callbackURL = process.env.CALLBACK_URL as string;

const googleStrategy = new GoogleStrategy(
  {
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: callbackURL,
  },
  async (accessToken, refreshToken, profile, done) => {
    const { email } = profile._json as GoogleProfile;
    try {
      let user: User | UserSignup | null = await findByEmail(email);
      if (!user) {
        user = { email: email, password: "" } as UserSignup;
        await addUser(user);
        user = await findByEmail(email);
      }
      if (!user) {
        throw new Error("No se pudo crear o encontrar el usuario");
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

export { googleStrategy };
