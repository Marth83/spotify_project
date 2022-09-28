import logo from './logo.svg';
import './App.css';
import { accessToken, logout, getCurrentUserProfile } from './spotify'
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Playlist from './pages/Playlist'
import TopArtists from './pages/TopArtists'

function App() {
  
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
    const fetchUserData = async () => {
      const { data } = await getCurrentUserProfile();
      console.log(data);
    }
    fetchUserData()
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        { !token ? (
          <>
            <img src={logo} className="App-logo" alt="logo" />
            <a
              className="App-link"
              href="http://localhost:8888/login"
            >
              Log into Spotify
            </a>
          </>
        ):(
          <BrowserRouter>
            <ScrollToTop>
              <Routes>
                <Route path='playlist' element={<Playlist />} />
                <Route path='topArtist' element={<TopArtists />} />
                <Route path='/' element={
                  <>
                    <h1>Logged in!</h1>
                    <button onClick={logout}>Log out</button>
                  </>
                  }
                />
                <Route path='*' element={
                  <h1>Oups! You're lost!</h1>
                }
              />
              </Routes>
            </ScrollToTop>
          </BrowserRouter>
        )}
      </header>
    </div>
  );
}


export default App;
