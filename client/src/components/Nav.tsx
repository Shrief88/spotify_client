import { Link } from "react-router-dom";
import spotifyLogo from "./../icons/spotify.png";
import PersonIcon from "@mui/icons-material/Person";
import NavItem from "./NavItem";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import ReplayIcon from "@mui/icons-material/Replay";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import MicExternalOnIcon from "@mui/icons-material/MicExternalOn";
import { useState } from "react";
import githubLogo from "./../icons/github.png";

const Nav = () => {
  let path = document.location.pathname.split("/")[1];
  if (path === "") {
    path = "profile";
  }

  const [activeItem, setActiveItem] = useState<string>(path);

  const handleNavToggle = (navTitle: string) => {
    setActiveItem(navTitle);
  };

  return (
    <div className="bg-darkBlack min-w-fit bottom-0 grid items-center sticky sm:h-screen sm:top-0 sm:justify-between">
      <Link to="/" className="hidden sm:flex sm:justify-center">
        <img src={spotifyLogo} className="w-12" />
      </Link>
      <div className="grid grid-cols-5 sm:grid-cols-1">
        <NavItem
          activeItem={activeItem}
          icon={PersonIcon}
          title="Profile"
          link="/"
          handleNavToggle={handleNavToggle}
        />
        <NavItem
          icon={MicExternalOnIcon}
          title="Top Artists"
          link="/top_artists"
          activeItem={activeItem}
          handleNavToggle={handleNavToggle}
        />
        <NavItem
          activeItem={activeItem}
          icon={AudiotrackIcon}
          title="Top Tracks"
          link="/top_tracks"
          handleNavToggle={handleNavToggle}
        />
        <NavItem
          activeItem={activeItem}
          icon={QueueMusicIcon}
          title="Playlists"
          link="/playlists"
          handleNavToggle={handleNavToggle}
        />
        <NavItem
          activeItem={activeItem}
          icon={ReplayIcon}
          title="Recent"
          link="/recent"
          handleNavToggle={handleNavToggle}
        />
      </div>
      <Link
        to="https://github.com/Shrief88"
        className="hidden sm:flex sm:justify-center">
        <img src={githubLogo} className="w-12" />
      </Link>
    </div>
  );
};

export default Nav;
