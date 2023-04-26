import { useEffect, useState } from "react";
import "./App.css";
import { accessToken, logout } from "./auth";
import { getCurrentUser } from "./data";

function App() {
  const [token, setToken] = useState<string | boolean>(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setToken(accessToken);
    const fetchData = async () => {
      try {
        const { data } = await getCurrentUser();
        setCurrentUser(data);
      } catch (e) {
        console.error(e);
      }
    };
    if (accessToken) fetchData();
  }, []);
  console.log(currentUser);

  return (
    <>
      <div className="card">
        {accessToken ? (
          <div>
            <h1>logged in</h1>
            <button onClick={() => logout()}>Logout</button>
          </div>
        ) : (
          <a href="http://localhost:3000/login">login to spotifiy</a>
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
