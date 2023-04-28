import { useEffect, useState } from "react";
import { accessToken, logout } from "./data/auth";
import { getCurrentUser } from "./data/data";

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
    <>
      <div className="card">
        {token ? (
          <div>
            <h1>logged in</h1>
            <h1>{currentUser.display_name}</h1>
            <h1>{currentUser.followers}</h1>
            <img src={currentUser.imageUrl}></img>
            <button onClick={() => logout()}>Logout</button>
          </div>
        ) : (
          <a href="http://localhost:3000/login">login to spotify</a>
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
