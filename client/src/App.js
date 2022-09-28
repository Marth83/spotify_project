import logo from './logo.svg';
import './App.css';
import { accessToken, logout } from './spotify'
import { useState, useEffect } from 'react';
var SpotifyWebApi = require('spotify-web-api-js');
var spotifyApi = new SpotifyWebApi();

function App() {
  
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
    spotifyApi.setAccessToken(accessToken);
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        { !token ? (
          <a
            className="App-link"
            href="http://localhost:8888/login"
          >
            Log into Spotify
          </a>
        ):(
          <>
          <h1>Logged in!</h1>
          <button onClick={logout}>Log out</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
