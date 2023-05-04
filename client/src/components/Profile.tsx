import { logout } from "../data/auth";

interface ProfileProps {
  name: string;
  imageUrl: string;
  numberOfFollowers: number;
  numberOfFollowing: number;
  numberOfPlaylists: number;
}

const Profile = (props: ProfileProps) => {
  return (
    <div className="bg-darkGrey p-32 flex-1">
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
            <p className="text-lightGrey text-xs uppercase">followes</p>
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
        <button
          className="btn-sm border px-6 rounded-full hover:bg-white hover:text-black"
          onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
