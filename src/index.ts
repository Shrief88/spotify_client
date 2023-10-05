import express  = require("express");
import dotenv = require("dotenv");
import * as queryString from "querystring"
import randomstring = require("randomstring");
import { Buffer } from 'buffer';
import axios from "axios";

dotenv.config();
const {PORT,CLIENT_ID,CLIENT_SECRET,REDIRECT_URI} = process.env;

const app = express();

const port = parseInt(PORT as string);
const host = "localhost";

app.get('/',(req,res)=>{
  res.send('testing....')
})

app.get('/login',(req,res)=>{
  const state = randomstring.generate(16); 
  const scope = 'user-read-private user-read-email';
  const stateKey = 'spotify_auth_state';

  res.cookie(stateKey,state);

  res.redirect('http://accounts.spotify.com/authorize?' + 
    queryString.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state
    })
  )
})

app.get('/callback',async(req,res)=>{
  const code = req.query.code as string|| null;
  const state = req.query.state || null;
  
  if(state == null){
    res.redirect('/#' + queryString.stringify({error:'state mismatch'}));
  }else{
    try{
      const response = await axios({
        method : 'post',
        url : 'https://accounts.spotify.com/api/token',
        data : queryString.stringify({
          grant_type: 'authorization_code',
          code : code,
          redirect_uri : REDIRECT_URI,
        }),
        headers: {
          'Content-type' : 'application/x-www-form-urlencoded',
          Authorization : 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
        }
      })

      if(response.status === 200){
        res.send(`<pre>${JSON.stringify(response.data,null,2)}</pre>`)
      }else{
        res.send(response);
      }
    }catch(err){
      console.log(err);
    }
  }
})

app.listen(port,host,()=>{
  console.log(`Express app is listening on: http://${host}:${port}`);
})