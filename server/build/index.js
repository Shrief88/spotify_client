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
app.get("/", (req, res) => {
    res.send("testing....");
});
app.get("/login", (req, res) => {
    const state = randomstring.generate(16);
    const scope = "user-read-private user-read-email";
    const stateKey = "spotify_auth_state";
    res.cookie(stateKey, state);
    res.redirect("http://accounts.spotify.com/authorize?" +
        queryString.stringify({
            response_type: "code",
            client_id: CLIENT_ID,
            scope,
            redirect_uri: REDIRECT_URI,
            state
        }));
});
app.get("/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const code = (_a = req.query.code) !== null && _a !== void 0 ? _a : null;
    const state = (_b = req.query.state) !== null && _b !== void 0 ? _b : null;
    if (state == null) {
        res.redirect("/#" + queryString.stringify({ error: "state mismatch" }));
    }
    else {
        try {
            const response = yield (0, axios_1.default)({
                method: "post",
                url: "https://accounts.spotify.com/api/token",
                data: queryString.stringify({
                    grant_type: "authorization_code",
                    code,
                    redirect_uri: REDIRECT_URI
                }),
                headers: {
                    "Content-type": 'application/x-www-form-urlencoded',
                    Authorization: "Basic " +
                        buffer_1.Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64")
                }
            });
            if (response.status === 200) {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                const { access_token, refresh_token, expires_in } = response.data;
                const queryParms = queryString.stringify({
                    access_token,
                    refresh_token,
                    expires_in
                });
                res.redirect(`http://localhost:5173/?${queryParms}`);
            }
            else {
                res.redirect(`/?${queryString.stringify({
                    error: "invalid token"
                })}`);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}));
// app.get('/refresh_token',async (req,res)=>{
//   const refresh_token = req.query.refresh_token as string;
//   try{
//     const response = await axios({
//       method : 'post',
//       url : 'https://accounts.spotify.com/api/token',
//       data : queryString.stringify({
//         grant_type : 'refresh_token',
//         refresh_token : refresh_token
//       }),
//       headers:{
//         'Content-type' : 'application/x-www-form-urlencoded',
//         Authorization : 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
//       }
//     })
//     if(response.status === 200){
//     }
//   }catch(err){
//     console.log(err);
//   }
// })
app.listen(port, host, () => {
    console.log(`Express app is listening on: http://${host}:${port}`);
});
