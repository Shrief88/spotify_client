import { cleanEnv, port, str } from "envalid";
import dotenv from "dotenv";
dotenv.config();

export default cleanEnv(process.env, {
  PORT: port(),
  CLIENT_ID: str(),
  CLIENT_SECRET: str(),
  CLIENT_URI: str(),
  REDIRECT_URI_DEV: str(),
  REDIRECT_URI_PROD: str(),
  SCOPE: str(),
  NODE_ENV: str({ choices: ["development", "test", "production"] }),
  HOST_PROD: str(),
});
