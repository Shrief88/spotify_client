import { useEffect, useState } from "react";
import { accessToken } from "./data/auth";
import {
  getCurrentUser,
  getUserPlaylist,
  getFollowingArtist,
  getTopArtists,
  getTopTracks,
} from "./data/data";
import Profile from "./pages/Profile.tsx";
import Login from "./pages/Login.tsx";
import Artists from "./pages/Artists.tsx";
import Nav from "./components/Nav.tsx";
import Loader from "./components/Loader.tsx";
import { capitalize, formatTime } from "./util/index.ts";
import { User, Artist, Track } from "./interfaces/index.ts";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const token = accessToken;
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User>({
    display_name: "",
    followers: 0,
    imageUrl: "",
    playlists: 0,
    following: 0,
  });
  const [topArtists, setTopArtists] = useState<Array<Artist>>([]);
  const [topTracks, setTopTracks] = useState<Array<Track>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const playlistData = (await getUserPlaylist()).data;
        const followingArtistData = (await getFollowingArtist()).data;
        const userData = (await getCurrentUser()).data;

        const tmpUser: User = {
          display_name: capitalize(userData.display_name),
          followers: userData.followers.total,
          imageUrl: userData.images[0].url,
          playlists: playlistData.items.length,
          following: followingArtistData.artists.total,
        };

        const artistsData = (await getTopArtists()).data.items;
        const artistsArray: Array<Artist> = [];
        for (let i = 0; i < artistsData.length; i++) {
          artistsArray.push({
            name: artistsData[i].name,
            imageUrl: artistsData[i].images[1].url,
          });
        }

        const tracksData = (await getTopTracks()).data.items;
        const tracksArray: Array<Track> = [];
        for (let i = 0; i < tracksData.length; i++) {
          tracksArray.push({
            name: tracksData[i].name,
            artistName: tracksData[i].artists[0].name,
            albumName: tracksData[i].album.name,
            duration: formatTime(tracksData[i].duration_ms),
            imageUrl: tracksData[i].album.images[1].url,
          });
        }

        setTopTracks(tracksArray);
        setTopArtists(artistsArray);
        setCurrentUser(tmpUser);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    if (token) fetchData();
  }, []);

  return (
    <BrowserRouter>
      <div className="m-0 p-0 w-full h-full flex">
        {token ? (
          <>
            <Nav />
            {isLoading ? (
              <Loader></Loader>
            ) : (
              <div className="bg-black flex flex-col justify-center items-center">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Profile
                        name={currentUser.display_name}
                        numberOfFollowers={currentUser.followers}
                        numberOfPlaylists={currentUser.playlists}
                        imageUrl={currentUser.imageUrl}
                        numberOfFollowing={currentUser.following}
                        topArtists={topArtists}
                        topTracks={topTracks}></Profile>
                    }
                  />
                  <Route
                    path="/artists"
                    element={<Artists artists={topArtists} />}
                  />
                </Routes>
              </div>
            )}
          </>
        ) : (
          <Login />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
