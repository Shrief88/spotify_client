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
    <div>
      Hello World
    </div>
  );
}

export default Home;