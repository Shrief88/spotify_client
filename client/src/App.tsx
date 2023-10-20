import { useEffect, useState } from "react";
import { UserInfo, TopArtists, TopTracks,UserPlaylists} from "./interfaces";
import { getAccessToken } from "./auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import { getCurrentUser, getUserTopArtists, getUserTopTracks,getUserPlaylists, getFollowingArtists } from "./data";
import Loader from "./components/Loader";

function App() {
  const [token, setToken] = useState<string | null | undefined>(null);
  const [profile, setProfile] = useState<null | UserInfo>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [topArtists, setTopArtists] = useState<TopArtists | null>(null);
  const [topTracks, setTopTracks] = useState<TopTracks | null>(null);
  const [userPlaylists, setUserPlaylists] = useState<UserPlaylists | null>(null);
  const [followingNumber, setFollowingNumber] = useState<number | null>(null);

  useEffect(() => {
    const accessToken = getAccessToken();
    setToken(accessToken);

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userData: UserInfo = (await getCurrentUser()).data;
        const artistsData = (await getUserTopArtists()).data;
        const tracksData = (await getUserTopTracks()).data;
        const playlistsData = (await getUserPlaylists()).data;
        const followingArtistsNumber = (await getFollowingArtists()).data.artists.total;
        setTopArtists(artistsData);
        setProfile(userData);
        setTopTracks(tracksData);
        setUserPlaylists(playlistsData)
        setFollowingNumber(followingArtistsNumber);
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
                      numberOfPlaylists={userPlaylists?.items.length as number}
                      numbdrOfFollowing= {followingNumber as number}
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
