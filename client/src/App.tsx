import "./App.css";
import { useEffect,useState } from "react";
import { getAccessToken } from "./auth";
import { getCurrentUser } from "./data";
import { UserInfo } from "./interfaces";
import { catchErrors } from "./utils";


function App() {
  const [token , setToken] = useState<string|null|undefined>(null);
  const [profile, setProfile] = useState<null|UserInfo>(null);

  useEffect(() => {
    const accessToken = getAccessToken();
    setToken(accessToken);

    const fetchUserData = async ()=>{
      const data : UserInfo = (await getCurrentUser()).data;
      setProfile(data);
    }

    catchErrors(fetchUserData());
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

      {profile && (
        <div>
          <h1>{profile.display_name}</h1>
          <h1>{profile.followers.total}</h1>
          <img src={profile.images[1].url} alt="Avater" />
        </div>
      )}
      
    </>
  );
}

export default App;
