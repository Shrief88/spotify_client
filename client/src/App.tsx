import { useEffect, useState } from "react";
import { getAccessToken } from "./auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Artists from "./pages/Artists";
import Tracks from "./pages/Tracks";
import Playlists from "./pages/Playlist";
import Recent from "./pages/Recent";
import Layout from "./components/Layout";

function App() {
  const [token, setToken] = useState<string | null | undefined>(null);

  useEffect(() => {
    const accessToken = getAccessToken();
    setToken(accessToken);
  }, []);

  return (
    <>
      {!token ? (
        <Login />
      ) : (
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/top_artists" element={<Artists />} />
            <Route path="/top_tracks" element={<Tracks />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/recent" element={<Recent />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
