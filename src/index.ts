import express = require('express')
import dotenv = require('dotenv')
import * as queryString from 'querystring'
import randomstring = require('randomstring')
import { Buffer } from 'buffer'
import axios, { type AxiosResponse } from 'axios'

dotenv.config()
const { PORT, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env

const app = express()

const port = parseInt(PORT as string)
const host = 'localhost'

app.get('/', (req, res) => {
  res.send('testing....')
})

app.get('/login', (req, res) => {
  const state = randomstring.generate(16)
  const scope = 'user-read-private user-read-email'
  const stateKey = 'spotify_auth_state'

  res.cookie(stateKey, state)

  res.redirect('http://accounts.spotify.com/authorize?' +
    queryString.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope,
      redirect_uri: REDIRECT_URI,
      state
    })
  )
})

app.get('/callback', async (req, res) => {
  const code = req.query.code as string ?? null
  const state = req.query.state ?? null

  if (state == null) {
    res.redirect('/#' + queryString.stringify({ error: 'state mismatch' }))
  } else {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: queryString.stringify({
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI
        }),
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
        }
      })

      if (response.status === 200) {
        try {
          const userData = await getUserData(response)
          res.send(userData)
        } catch (err) {
          console.log(err)
        }
      } else {
        res.send(response)
      }
    } catch (err) {
      console.log(err)
    }
  }
})

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
  console.log(`Express app is listening on: http://${host}:${port}`)
})

const getUserData = async (response: AxiosResponse): Promise<string | AxiosResponse<any, any>> => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { access_token, token_type } = response.data
  const userResponse = await axios.get('http://api.spotify.com/v1/me', {
    headers: {
      Authorization: `${token_type} ${access_token}`
    }
  })

  if (userResponse.status === 200) {
    return `<pre>${JSON.stringify(userResponse.data, null, 2)}</pre>`
  } else {
    return response
  }
}
