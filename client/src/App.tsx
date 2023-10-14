import "./App.css";
import { useEffect,useState } from "react";
import { getAccessToken } from "./auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes,Route } from "react-router-dom";

function App() {
  const [token , setToken] = useState<string|null|undefined>(null);

  useEffect(() => {
    const accessToken = getAccessToken();
    setToken(accessToken);
  },[])
  
  return (
    <>
      {!token ? <Login />
      :(
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>        
      )}
    </>
  );
}

export default App;
