/* eslint-disable @typescript-eslint/naming-convention */
import express from "express";
import querystring from "querystring";
import dotenv from "dotenv";
import axios from "axios";
import generateRandomString from "./utili";
import { type SpotifyResponce } from "../shared/interfaces";
// import cors from "cors";

dotenv.config();
const app = express();
// app.use(cors);
const port = 3000;
const redirect_uri = "http://localhost:3000/callback";
const { CLIENT_ID, CLIENT_SECRET } = process.env;
const stateKey = "spotify_auth_state";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  const scope =
    "user-read-private user-read-email user-follow-read playlist-read-private user-top-read";
  res.cookie(stateKey, state);
  const queryParms = querystring.stringify({
    response_type: "code",
    client_id: CLIENT_ID,
    scope,
    redirect_uri,
    state,
  });
  res.redirect(`https://accounts.spotify.com/authorize?${queryParms}`);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code as string;

  try {
    const response = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID as string}:${CLIENT_SECRET as string}`
        ).toString("base64")}`,
      },
    });

    if (response.status === 200) {
      const data: SpotifyResponce = response.data;
      const { access_token, refresh_token, expires_in } = data;
      const queryParms = querystring.stringify({
        access_token,
        refresh_token,
        expires_in,
      });
      res.redirect(`http://localhost:5173?${queryParms}`);
    }
  } catch (e) {
    res.send(e);
  }
});

app.get("/refresh_token", async (req, res): Promise<void> => {
  const refresh_token = req.query.refresh_token as string;
  try {
    const response = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID as string}:${CLIENT_SECRET as string}`
        ).toString("base64")}`,
      },
    });
    res.send(response.data);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
