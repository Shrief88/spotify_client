import { Link } from "react-router-dom";
import spotifyLogo from "./../icons/spotify.png";
import PersonIcon from "@mui/icons-material/Person";
import NavItem from "./NavItem";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import ReplayIcon from "@mui/icons-material/Replay";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import MicExternalOnIcon from "@mui/icons-material/MicExternalOn";
import GitHubIcon from '@mui/icons-material/GitHub';

const Nav = () => {
  return (
    <div className="flex flex-col justify-between py-8 items-center bg-darkBlack left-0 top-0 sticky h-screen min-w-fit">
      <Link to="/">
        <img src={spotifyLogo} className="w-12" />
      </Link>
      <div>
        <NavItem icon={PersonIcon} title="Peofile" link="/" />
        <NavItem
          icon={MicExternalOnIcon}
          title="Top Artists"
          link="/top_artists"
        />
        <NavItem icon={AudiotrackIcon} title="Top Tracks" link="/top_tracks" />
        <NavItem icon={QueueMusicIcon} title="Playlists" link="/playlists" />
        <NavItem icon={ReplayIcon} title="Recent" link="/recent" />
      </div>
      <NavItem icon={GitHubIcon} title="GitHub" link="https://github.com/Shrief88" />
    </div>
  );
};

export default Nav;
