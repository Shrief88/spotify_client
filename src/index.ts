/* eslint-disable @typescript-eslint/naming-convention */
import express from "express";
import querystring from "querystring";
import dotenv from "dotenv";
import axios from "axios";
import generateRandomString from "./utili";

dotenv.config();
const app = express();
const port = 3000;
const redirect_uri = "http://localhost:3000/callback";
const { CLIENT_ID, CLIENT_SECRET } = process.env;
const stateKey = "spotify_auth_state";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email";
  res.cookie(stateKey, state);

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        scope,
        redirect_uri,
        state,
      })
  );
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
      const { access_token, token_type } = response.data;
      try {
        const data = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `${token_type as string} ${access_token as string}`,
          },
        });
        res.send(data.data);
      } catch (e) {
        res.send(e);
      }
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
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
