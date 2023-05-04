import { useEffect, useState } from "react";
import { accessToken } from "./data/auth";
import { getCurrentUser, getUserPlaylist } from "./data/data";
import LoginButton from "./components/LoginButton.tsx";
import Profile from "./components/Profile.tsx";
import Nav from "./components/Nav.tsx";

interface User {
  display_name: string;
  followers: number;
  imageUrl: string;
  playlist: number;
}

function App() {
  const token = accessToken;
  const [currentUser, setCurrentUser] = useState<User>({
    display_name: "",
    followers: 0,
    imageUrl: "",
    playlist: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmp = await getUserPlaylist();
        const { data } = await getCurrentUser();
        const tmpUser: User = {
          display_name: data.display_name,
          followers: data.followers.total,
          imageUrl: data.images[0].url,
          playlist: tmp.data.items.length,
        };
        setCurrentUser(tmpUser);
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    };
    if (token) fetchData();
  }, []);

  return (
    <div className="m-0 p-0 w-full h-full">
      {token ? (
        <div className="flex h-full">
          <Nav></Nav>
          <Profile
            name={currentUser.display_name}
            numberOfFollowers={currentUser.followers}
            numberOfPlaylists={currentUser.playlist}
            imageUrl={currentUser.imageUrl}></Profile>
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
