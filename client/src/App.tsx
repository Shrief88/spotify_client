import { useEffect, useState } from "react";
import { UserInfo, TopArtists, TopTracks } from "./interfaces";
import { getAccessToken } from "./auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import { getCurrentUser, getUserTopArtists, getUserTopTracks } from "./data";
import Loader from "./components/Loader";

function App() {
  const [token, setToken] = useState<string | null | undefined>(null);
  const [profile, setProfile] = useState<null | UserInfo>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [topArtists, setTopArtists] = useState<TopArtists | null>(null);
  const [topTracks, setTopTracks] = useState<TopTracks | null>(null);

  useEffect(() => {
    const accessToken = getAccessToken();
    setToken(accessToken);

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userData: UserInfo = (await getCurrentUser()).data;
        const artistData = (await getUserTopArtists()).data;
        const tracksData = (await getUserTopTracks()).data;
        setTopArtists(artistData);
        setProfile(userData);
        setTopTracks(tracksData);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      {!token ? (
        <Login />
      ) : (
        <div className="flex">
          <Nav />
          {isLoading ? (
            <Loader />
          ) : (
            <div className="bg-black flex flex-col justify-center items-center flex-1">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      profile={profile as UserInfo}
                      topArtists={topArtists as TopArtists}
                      topTracks={topTracks as TopTracks}
                    />
                  }
                />
              </Routes>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
