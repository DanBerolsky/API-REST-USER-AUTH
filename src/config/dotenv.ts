import dotenv, { DotenvConfigOptions } from "dotenv";

dotenv.config();
dotenv.config({
  path: "./.env.production",
  override: true,
} as DotenvConfigOptions);
