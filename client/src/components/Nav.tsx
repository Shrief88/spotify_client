import { Person } from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import ReplayIcon from "@mui/icons-material/Replay";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import spotifyLogo from "../icons/Spotify_icon.png";
import githubLogo from "../icons/github.png";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="flex flex-col justify-between py-8 items-center bg-navBlack left-0 top-0 sticky h-screen min-w-fit">
      <Link to="/">
        <img src={spotifyLogo} className="w-12" />
      </Link>
      <ul className="flex gap-1 flex-col">
        <MenuItem icon={Person} desc="Profile"></MenuItem>
        <MenuItem icon={MicIcon} desc="Top Artists"></MenuItem>
        <MenuItem icon={AudiotrackIcon} desc="Top Tracks"></MenuItem>
        <MenuItem icon={ReplayIcon} desc="Recent"></MenuItem>
        <MenuItem icon={PlaylistAddIcon} desc="Playlist"></MenuItem>
      </ul>
      <div>
        <a href="https://github.com/Shrief88/spotify_client">
          <img src={githubLogo} className="w-12" />
        </a>
      </div>
    </div>
  );
};

export default Nav;
