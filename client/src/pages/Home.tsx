import { UserInfo, TopArtists, TopTracks } from "../interfaces";
import UserInfoItem from "../components/userInfoItem";
import Button from "../components/Button";
import { logout } from "../auth";


interface HomeProps {
  profile : UserInfo,
  topTracks : TopTracks,
  topArtists : TopArtists,
  numberOfPlaylists : number,
  numbdrOfFollowing : number,
}

function Home(props : HomeProps) {
  return (
    <div>
        <div className="flex flex-col items-center gap-7">
          <img
            src={props.profile.images[1].url}
            width="150"
            className="rounded-full"
          />
          <p className="font-bold text-4xl tracking-wider">
            {props.profile.display_name}
          </p>
          <div className="flex gap-5 uppercase  tracking-widest">
            <UserInfoItem
              title="followers"
              number={props.profile.followers.total}
            />
            <UserInfoItem
              title="following"
              number={props.numbdrOfFollowing}
            />
            <UserInfoItem
              title="playlists"
              number={props.numberOfPlaylists}
            />
          </div>
          <Button text="Logout" onClick={logout} />
        </div>
    </div>
  );
}

export default Home;
