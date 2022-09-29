import logo from './logo.svg';
import './App.css';
import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { Playlist, Playlists, TopArtists, TopTracks, History, Login } from './pages';
import ScrollToTop from './scrollToTop';
import { GlobalStyle } from './styles';
import styled from 'styled-components/macro';

const StyledLoginButton = styled.a`
  background-color: var(--green);
  color: var(--white);
  padding: 10px 20px;
  margin: 20px;
  border-radius: 30px;
  display: inline-block;
`;

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
      <GlobalStyle />
      <header className="App-header">
        { !token ? (
          <Login />
        ):(
          <BrowserRouter>
            <ScrollToTop>
              <Routes>
                <Route path='playlist' element={<Playlists />} />
                <Route path='playlist/:id' element={<Playlist />} />
                <Route path='topArtist' element={<TopArtists />} />
                <Route path='topTracks' element={<TopTracks />} />
                <Route path='history' element={<History />} />
                <Route path='/' element={
                  <>
                    <h1>Logged in!</h1>
                    <button onClick={logout}>Log out</button>
                  </>
                  }
                />
                <Route path='*' element={
                  <>
                    <h1>Oups! You're lost!</h1>
                    <Link to="/" className="btn">Back home</Link>
                  </>
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
