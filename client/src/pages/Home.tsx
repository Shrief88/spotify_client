import { UserInfo, TopArtists, TopTracks } from "../interfaces";
import UserInfoItem from "../components/userInfoItem";
import Button from "../components/Button";
import { logout } from "../auth";
import ArtistDiv from "../components/ArtistDiv";
import { Artist, Track } from "../interfaces";
import TrackDiv from "../components/TrackDiv";

interface HomeProps {
  profile: UserInfo;
  topTracks: TopTracks;
  topArtists: TopArtists;
  numberOfPlaylists: number;
  numbdrOfFollowing: number;
}

function Home(props: HomeProps) {
  const topArtists = props.topArtists.items
    .slice(0, 10)
    .map((item: Artist) => (
      <ArtistDiv name={item.name} url={item.images[0].url} />
    ));

  const topTracks = props.topTracks.items
    .slice(0, 10)
    .map((item: Track) => (
      <TrackDiv
        name={item.name}
        url={item.album.images[0].url}
        artists={item.artists}
        duration={item.duration_ms}
        album={item.album.name}
      />
    ));

  

  return (
    <div className="flex flex-col items-center pt-12">
      <div className="flex flex-col items-center gap-7">
        <img
          src={props.profile.images[1].url}
          width="150"
          className="rounded-full"
        />
        <p className="font-bold text-5xl tracking-normal">
          {props.profile.display_name}
        </p>
        <div className="flex gap-5 uppercase  tracking-widest">
          <UserInfoItem
            title="followers"
            number={props.profile.followers.total}
          />
          <UserInfoItem title="following" number={props.numbdrOfFollowing} />
          <UserInfoItem title="playlists" number={props.numberOfPlaylists} />
        </div>
        <Button text="Logout" onClick={logout} />
      </div>

      <div className="flex gap-16 pt-20">
        <div>
          <div className="flex justify-between items-center min-w-[600px] pb-12">
            <p className="font-bold text-xl">Top Artists of All Time</p>
            <Button text="See More" onClick={() => {}} />
          </div>
          {topArtists}
        </div>
        <div>
          <div className="flex gap-3 items-center justify-between min-w-[600px] pb-12">
            <p className="font-bold text-xl">Top Tracks of All Time</p>
            <Button text="See More" onClick={() => {}} />
          </div>
          {topTracks}
        </div>
      </div>
    </div>
  );
}

export default Home;
