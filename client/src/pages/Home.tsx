import { useEffect, useState } from "react";
import { UserInfo } from "../interfaces";
import { getCurrentUser } from "../data";
import { catchErrors } from "../utils";

function Home() {
  const [profile, setProfile] = useState<null | UserInfo>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data: UserInfo = (await getCurrentUser()).data;
      setProfile(data);
    };

    catchErrors(fetchUserData());
  }, []);

  return (
    <>
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

export default Home;