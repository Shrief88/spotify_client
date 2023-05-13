import { logout } from "../data/auth";
import MyButton from "./MyButton";
import TopArtists from "./TopArtists";
import TopTracks from "./TopTracks";
import { Artist,Track } from "../interfaces";

interface ProfileProps {
  name: string;
  imageUrl: string;
  numberOfFollowers: number;
  numberOfFollowing: number;
  numberOfPlaylists: number;
  topArtists : Array<Artist>;
  topTracks : Array<Track>;
}

const Profile = (props: ProfileProps) => {
  return (
    <div className="p-32 flex flex-col flex-1 gap-16 px-96">
      <div className="flex flex-col items-center gap-4">
        <div className="avatar">
          <div className="w-36 rounded-full">
            <img src={props.imageUrl} />
          </div>
        </div>
        <p className="text-4xl font-bold">{props.name}</p>
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <p className="text-green">{props.numberOfFollowers}</p>
            <p className="text-lightGrey text-xs uppercase">followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-green">{props.numberOfFollowing}</p>
            <p className="text-lightGrey text-xs uppercase">following</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-green">{props.numberOfPlaylists}</p>
            <p className="text-lightGrey text-xs uppercase">playlists</p>
          </div>
        </div>
        <MyButton title="logout" onClick={logout}></MyButton>
      </div>

      <div className="grid grid-cols-2 gap-20">
        <TopArtists title="Top Artists of All Time" artists={props.topArtists.slice(0,10)}></TopArtists>
        <TopTracks title="Top Tracks of All Time" tracks={props.topTracks.slice(0,10)}></TopTracks>
      </div>
    </div>
  );
};

export default Profile;
