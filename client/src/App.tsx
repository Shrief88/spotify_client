import "./App.css";
import { useEffect,useState } from "react";
import { getAccessToken } from "./spotify";

function App() {
  const [token , setToken] = useState<string|null|undefined>(null);

  useEffect(() => {
    const accessToken = getAccessToken();
    setToken(accessToken);
  },[])

  
  return (
    <>
      {!token ? (
        <a href="http://localhost:3000/login">
          <button>login</button>
        </a>
      ):(
        <p>Logged in!</p>
      )}
      
    </>
  );
}

export default App;
