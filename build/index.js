"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const queryString = require("querystring");
const randomstring = require("randomstring");
const buffer_1 = require("buffer");
const axios_1 = require("axios");
dotenv.config();
const { PORT, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;
const app = express();
const port = parseInt(PORT);
const host = "localhost";
app.get('/', (req, res) => {
    res.send('testing....');
});
app.get('/login', (req, res) => {
    const state = randomstring.generate(16);
    const scope = 'user-read-private user-read-email';
    const stateKey = 'spotify_auth_state';
    res.cookie(stateKey, state);
    res.redirect('http://accounts.spotify.com/authorize?' +
        queryString.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state
        }));
});
app.get('/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code || null;
    const state = req.query.state || null;
    if (state == null) {
        res.redirect('/#' + queryString.stringify({ error: 'state mismatch' }));
    }
    else {
        try {
            // const response = await axios({
            //   method: "post",
            //   url: "https://accounts.spotify.com/api/token",
            //   data: queryString.stringify({
            //     grant_type: "authorization_code",
            //     code : code,
            //     REDIRECT_URI : REDIRECT_URI,
            //   }),
            //   headers: {
            //     "content-type": "application/x-www-form-urlencoded",
            //     Authorization: `Basic ${Buffer.from(
            //       `${CLIENT_ID as string}:${CLIENT_SECRET as string}`
            //     ).toString("base64")}`,
            //   },
            // });
            const response = yield (0, axios_1.default)({
                method: 'post',
                url: 'https://https://accounts.spotify.com/api/token',
                data: queryString.stringify({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: REDIRECT_URI,
                }),
                headers: {
                    'Content-Length': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic ' + (buffer_1.Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
                }
            });
            if (response.status === 200) {
                res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
            }
            else {
                res.send(response);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}));
app.listen(port, host, () => {
    console.log(`Express app is listening on: http://${host}:${port}`);
});
