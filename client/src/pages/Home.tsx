import { useEffect, useState } from "react";
import { UserInfo } from "../interfaces";
import { getCurrentUser } from "../data";
import { catchErrors } from "../utils";
import UserInfoItem from "../components/userInfoItem";

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
      <div className="flex flex-col items-center gap-3">
        <img src={profile?.images[1].url} width="150" className="rounded-full"/>
        <p className="font-bold text-4xl tracking-wider">{profile?.display_name}</p>
        <div className="flex gap-5 uppercase  tracking-widest">
          <UserInfoItem title="followers" number={profile?.followers.total as number} />
          <UserInfoItem title="following" number={profile?.followers.total as number} />
          <UserInfoItem title="playlists" number={profile?.followers.total as number} />
        </div>
      </div>
    </div>
  );
}

export default Home;