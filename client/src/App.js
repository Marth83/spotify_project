import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { Playlist, Playlists, TopArtists, TopTracks, History, Login, Profile } from './pages';
import ScrollToTop from './scrollToTop';
import { GlobalStyle } from './styles';
import styled from 'styled-components/macro';

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
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
          <>
          <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
          <BrowserRouter>
            <ScrollToTop>
              <Routes>
                <Route path='playlist' element={<Playlists />} />
                <Route path='playlist/:id' element={<Playlist />} />
                <Route path='topArtist' element={<TopArtists />} />
                <Route path='topTracks' element={<TopTracks />} />
                <Route path='history' element={<History />} />
                <Route path='/' element={<Profile />}
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
          </>
        )}
      </header>
    </div>
  );
}


export default App;
