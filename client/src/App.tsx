import { useEffect, useState } from "react";
import { getAccessToken } from "./auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Artists from "./pages/Artists";
import Tracks from "./pages/Tracks";

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
        <div className="flex">
          <Nav />
          <div className="bg-black flex flex-col flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/top_artists" element={<Artists />} />
              <Route path="/top_tracks" element={<Tracks />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
