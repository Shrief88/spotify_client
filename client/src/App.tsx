import { useEffect, useState } from "react";
import { accessToken } from "./data/auth";
import {
  getCurrentUser,
  getUserPlaylist,
  getFollowingArtist,
  getTopArtists,
} from "./data/data";
import LoginButton from "./components/LoginButton.tsx";
import Profile from "./components/Profile.tsx";
import Nav from "./components/Nav.tsx";
import Loader from "./components/Loader.tsx";
import { capitalize } from "./util/index.ts";
import { User,Artist } from "./interfaces/index.ts";

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
  const [topArtists,setTopArtists] = useState<Array<Artist>>([]);

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


        const artist = (await getTopArtists()).data.items;
        const arr : Array<Artist> = []
        for(let i = 0 ; i < artist.length ; i++){
          arr.push({
            name : artist[i].name,
            imageUrl: artist[i].images[1].url,
          })
        }
        setTopArtists(arr);
        setCurrentUser(tmpUser);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    if (token) fetchData();
  }, []);

  return (
    <div className="m-0 p-0 w-full h-full bg-black">
      {token ? (
        <div className="flex h-full">
          <Nav></Nav>
          {isLoading ? (
            <Loader></Loader>
          ) : (
            <Profile
              name={currentUser.display_name}
              numberOfFollowers={currentUser.followers}
              numberOfPlaylists={currentUser.playlists}
              imageUrl={currentUser.imageUrl}
              numberOfFollowing={currentUser.following}
              topArtists={topArtists}></Profile>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full gap-3">
          <p className="text-2xl font-bold">Spotify Profile</p>
          <LoginButton
            title="Login to spotify"
            url="http://localhost:3000/login"></LoginButton>
        </div>
      )}
    </div>
  );
}

export default App;
