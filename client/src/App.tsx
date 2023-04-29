import { useEffect, useState } from "react";
import { accessToken, logout } from "./data/auth";
import { getCurrentUser } from "./data/data";
import LoginButton from "./components/loginButton.tsx"

interface User {
  display_name: string;
  followers: number;
  imageUrl: string;
}

function App() {
  const [token, setToken] = useState<string | boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>({
    display_name: "",
    followers: 0,
    imageUrl: "",
  });

  useEffect(() => {
    setToken(accessToken);
    const fetchData = async () => {
      try {
        const { data } = await getCurrentUser();
        const tmpUser: User = {
          display_name: data.display_name,
          followers: data.followers.total,
          imageUrl: data.images[0].url,
        };
        setCurrentUser(tmpUser);
      } catch (e) {
        console.error(e);
      }
    };
    if (accessToken) fetchData();
  }, []);

  return (
    <div className="m-0 p-0 w-full h-full">
        {token ? (
          <div className="flex-col justify-center">
            <p className="text-3xl">gg</p>
            <h1>logged in</h1>
            <h1>{currentUser.display_name}</h1>
            <h1>{currentUser.followers}</h1>
            <img src={currentUser.imageUrl}></img>
            <button onClick={() => logout()}>Logout</button>
          </div>
        ) : (
          <div className="flex-col items-center justify-center">
             <LoginButton title="Login to spotify" url="http://localhost:3000/login"></LoginButton>
          </div>
        )}
    </div>
  );
}

export default App;
