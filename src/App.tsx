import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import Loader from './components/shared/Loader';

const Home = lazy(() => import('./pages/Home'));
const Artist = lazy(() => import('./pages/Artist'));
const Favorite = lazy(() => import('./pages/Favorite'));
const AlbumDetails = lazy(() => import('./pages/AlbumDetails'));
const ArtistAlbums = lazy(() => import('./pages/ArtistAlbums'));

import { GlobalStyles } from './styles/GlobalStyles';

const App: React.FC = () => {

  return (
    <Router>
      <GlobalStyles />
      <Suspense fallback={<Loader />}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/albums/:id" element={<AlbumDetails />} />
            <Route path="/artists" element={<Artist />} />
            <Route path="/artists/:id/albums" element={<ArtistAlbums />} />
            <Route path="/favorites" element={<Favorite />} />
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default App;
