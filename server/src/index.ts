import express from "express";
import queryString from "querystring";
import morgan from "morgan";
import env from "./utils/validateEnv";
import axios from "axios";
import randomstring = require("randomstring");

const { PORT, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = env;
const host = "localhost";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("testing....");
});

app.get("/login", (req, res) => {
  const state = randomstring.generate(16);
  const scope =
    "user-follow-read user-top-read user-read-private user-read-email playlist-read-private  user-read-recently-played";
  const stateKey = "spotify_auth_state";

  res.cookie(stateKey, state);

  res.redirect(
    "http://accounts.spotify.com/authorize?" +
      queryString.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        scope,
        redirect_uri: REDIRECT_URI,
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
          redirect_uri: REDIRECT_URI,
        }),
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
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

        res.redirect(`http://localhost:5173/?${queryParms}`);
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
          Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
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

app.listen(PORT, host, () => {
  console.log(`Express app is listening on: http://${host}:${PORT}`);
});
