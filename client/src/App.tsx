import { useEffect, useState } from "react";
import "./App.css";
import { getAccessToken, logout } from "./spotifiy";

function App() {
  const [accessToken, setAccessToken] = useState<string | boolean>(false);

  useEffect(() => {
    setAccessToken(getAccessToken);
  }, []);
  
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
