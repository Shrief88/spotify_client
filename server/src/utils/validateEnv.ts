import { cleanEnv, port, str } from "envalid";
import dotenv from "dotenv";
dotenv.config();

export default cleanEnv(process.env, {
  PORT: port(),
  CLIENT_ID: str(),
  CLIENT_SECRET: str(),
  REDIRECT_URI: str(),
  SCOPE: str(),
});
