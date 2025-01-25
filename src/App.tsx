import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './Layout';

import Home from './pages/Home';
import Artist from './pages/Artist';
import Favorite from './pages/Favorite';
import AlbumDetails from './pages/AlbumDetails';
import ArtistAlbums from './pages/ArtistAlbums';

import { GlobalStyles } from './styles/GlobalStyles';

const App: React.FC = () => {

  return (
    <Router>
      <GlobalStyles />
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/albums/:id" element={<AlbumDetails />} />
        <Route path="/artists" element={<Artist />} />
        <Route path="/artists/:id/albums" element={<ArtistAlbums />} />
        <Route path="/favorites" element={<Favorite />} />
      </Routes>
    </Router>
  );
};

export default App;
