const express = require('express');
const axios = require('axios');
const app = express();
var SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const scopes = ['user-read-private', 'user-read-email', 'user-top-read', 'user-read-recently-played'];

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.PRIVATE_ID;
const redirect_uri = "http://localhost:8888/callback";

var spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri
  });


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

app.get('/', (req, res)=>{
    res.send("Hello World, I have a demon with me.");
});

app.get('/login', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
  });

app.get('/refresh_token', (req, res) => {
  const { refresh_token } = req.query;

  const queryParams = new URLSearchParams({
    grant_type : 'refresh_token',
    refresh_token: refresh_token
  })

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: queryParams.toString(),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    });
});

app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;
  
    if (error) {
      console.error('Callback Error:', error);
      res.send(`Callback Error: ${error}`);
      return;
    }
  
    spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];

        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
  
        console.log('access_token:', access_token);
        console.log('refresh_token:', refresh_token);
  
        console.log(
          `Sucessfully retreived access token. Expires in ${expires_in} s.`
        );

        const queryParams = new URLSearchParams({
            access_token,
            refresh_token,
            expires_in,
        })

        res.redirect(`http://localhost:3000/?${queryParams.toString()}`);
      })
      .catch(error => {
        console.error('Error getting Tokens:', error);
        res.send(`Error getting Tokens: ${error}`);
      });
});

const port = 8888;
app.listen(port, ()=>{
    console.log(`Express app listening at http://localhost:${port}`);
});
