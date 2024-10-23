import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import GoogleProfile from "../../types/google";
import fetchUserOrRegister from "../userService";

const clientID = process.env.GOOGLE_CLIENT_ID as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const callbackURL = process.env.GOOGLE_CALLBACK_UR as string;

export default new GoogleStrategy(
  {
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: callbackURL,
  },
  async (accessToken, refreshToken, profile, done) => {
    const { email } = profile._json as GoogleProfile;
    return fetchUserOrRegister(email, done);
  }
);
