import { Routes, Route, Navigate } from 'react-router-dom';

import GamesPage from './js/games/pages/query/gamesPage.tsx';
import GamePage from './js/games/pages/query/gamePage.tsx';
import NestedGamesPage from './js/games/pages/query/nestedGamesPage.tsx';
import NestedGamePage from './js/games/pages/query/nestedGamePage.tsx';

import CreateGamePage from './js/games/pages/mutation/createGamePage.tsx';
import UpdateGamePage from './js/games/pages/mutation/updateGamePage.tsx';
import DeleteGamePage from './js/games/pages/mutation/deleteGamePage.tsx';

import PlatformsPage from './js/platforms/pages/platformsPage.tsx';

import ScoresPage from './js/scores/pages/scoresPage.tsx';
import ScorePage from './js/scores/pages/scorePage.tsx';

import LoginPage from './js/auth/pages/loginPage.tsx';
import RegisterPage from './js/auth/pages/registerPage.tsx';
import LogoutPage from './js/auth/pages/logoutPage.tsx';
import OauthPage from './js/auth/pages/oauthPage.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/nested-games" replace />} />

      <Route path="/games" element={<GamesPage />} />
      <Route path="/games/:id" element={<GamePage />} />
      <Route path="/nested-games" element={<NestedGamesPage />} />
      <Route path="/nested-games/:id" element={<NestedGamePage />} />

      <Route path="/games/create" element={<CreateGamePage />} />
      <Route path="/games/update/:id" element={<UpdateGamePage />} />
      <Route path="/games/delete/:id" element={<DeleteGamePage />} />

      <Route path="/platforms" element={<PlatformsPage />} />

      <Route path="/scores" element={<ScoresPage />} />
      <Route path="/scores/:id" element={<ScorePage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/oauth/callback" element={<OauthPage />} />


    </Routes>
  );
}

export default App;
