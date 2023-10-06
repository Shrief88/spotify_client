import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParms = new URLSearchParams(queryString);
    const accessToken = urlParms.get('access_token');
    const refreshToken = urlParms.get('refresh_token');

    console.log(accessToken);
    console.log(refreshToken);
  },[])


  return (
    <>
      <a href="http://localhost:3000/login">
        <button>login</button>
      </a>
    </>
  );
}

export default App;
