import express, { type RequestHandler } from "express";
import queryString from "querystring";
import morgan from "morgan";
import env from "./utils/validateEnv";
import axios from "axios";
import randomstring = require("randomstring");
import cors from "cors";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
const corsOptions: RequestHandler = cors();
app.options("*", corsOptions);

app.get("/", (req, res) => {
  res.send("testing....");
});

app.get("/login", (req, res) => {
  const state = randomstring.generate(16);
  const scope = env.SCOPE;
  const stateKey = "spotify_auth_state";

  res.cookie(stateKey, state);

  res.redirect(
    "http://accounts.spotify.com/authorize?" +
      queryString.stringify({
        response_type: "code",
        client_id: env.CLIENT_ID,
        scope,
        redirect_uri:
          env.NODE_ENV === "production"
            ? env.REDIRECT_URI_PROD
            : env.REDIRECT_URI_DEV,
        state,
      }),
  );
});

app.get("/callback", async (req, res) => {
  const code = (req.query.code as string) ?? null;
  const state = req.query.state ?? null;

  if (state == null) {
    res.redirect("/#" + queryString.stringify({ error: "state mismatch" }));
  } else {
    try {
      const response = await axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: queryString.stringify({
          grant_type: "authorization_code",
          code,
          redirect_uri:
            env.NODE_ENV === "production"
              ? env.REDIRECT_URI_PROD
              : env.REDIRECT_URI_DEV,
        }),
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(env.CLIENT_ID + ":" + env.CLIENT_SECRET).toString(
              "base64",
            ),
        },
      });

      if (response.status === 200) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { access_token, refresh_token, expires_in } = response.data;
        const queryParms = queryString.stringify({
          access_token,
          refresh_token,
          expires_in,
        });

        res.redirect(`${env.CLIENT_URI}/?${queryParms}`);
      } else {
        res.redirect(
          `/?${queryString.stringify({
            error: "invalid token",
          })}`,
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
});

app.get("/refresh_token", async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const refresh_token = req.query.refresh_token as string;

  try {
    const response = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: queryString.stringify({
        grant_type: "refresh_token",
        refresh_token,
      }),
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(env.CLIENT_ID + ":" + env.CLIENT_SECRET).toString(
            "base64",
          ),
      },
    });
    if (response.status === 200) {
      res.send(response.data);
    } else {
      res.redirect(
        `/?${queryString.stringify({
          error: "invalid token",
        })}`,
      );
    }
  } catch (err) {
    console.log(err);
  }
});

// const host = env.NODE_ENV === "production" ? env.HOST_PROD : "localhost";

app.listen(env.PORT, () => {
  // const hostUrl =
  // env.NODE_ENV === "production"
  //   ? `https://${host}`
  //   : `http://${host}:${env.PORT}`;
  console.log(`Express app is listening on: ${env.PORT}`);
});
