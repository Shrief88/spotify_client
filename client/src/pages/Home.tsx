import { UserInfo, TopArtists, TopTracks } from "../interfaces";
import UserInfoItem from "../components/userInfoItem";
import Button from "../components/Button";
import { logout } from "../auth";
import { Artist, Track } from "../interfaces";
import TrackDiv from "../components/TrackDiv";
import { useEffect, useState } from "react";
import {
  getCurrentUser,
  getFollowingArtists,
  getUserPlaylists,
  getUserTopArtists,
  getUserTopTracks,
} from "../data";
import Loader from "../components/Loader";
import { NavLink } from "react-router-dom";

function Home() {
  const [user, setUser] = useState<null | UserInfo>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [topArtists, setTopArtists] = useState<TopArtists | null>(null);
  const [topTracks, setTopTracks] = useState<TopTracks | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userData: UserInfo = (await getCurrentUser()).data;
        userData.following = (await getFollowingArtists()).data.artists.total;
        userData.playlists = (await getUserPlaylists()).data.total;
        const artistsData = (await getUserTopArtists("long_term", 10)).data;
        const tracksData = (await getUserTopTracks("long_term", 10)).data;

        setUser(userData);
        setTopArtists(artistsData);
        setTopTracks(tracksData);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  const topArtistsDiv = topArtists?.items.map((item: Artist) => {
    return (
      <div key={item.id} className="flex items-center gap-5 py-3">
        <img
          src={item.images[0].url}
          className=" object-cover h-14 rounded-full w-14 hover:opacity-50"
        />

        <p>{item.name}</p>
      </div>
    );
  });

  const topTracksDiv = topTracks?.items.map((item: Track) => (
    <TrackDiv
      key={item.id}
      name={item.name}
      url={item.album.images[0].url}
      artists={item.artists}
      duration={item.duration_ms}
      album={item.album.name}
    />
  ));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center pt-12">
          <div className="flex flex-col items-center gap-7">
            <img
              src={user?.images[1].url}
              width="150"
              className="rounded-full"
            />
            <p className="font-bold text-5xl tracking-normal">
              {user?.display_name}
            </p>
            <div className="flex gap-5 uppercase  tracking-widest">
              <UserInfoItem
                title="followers"
                number={user?.followers.total as number}
              />
              <UserInfoItem
                title="following"
                number={user?.following as number}
              />
              <UserInfoItem
                title="playlists"
                number={user?.playlists as number}
              />
            </div>
            <Button text="Logout" onClick={logout} />
          </div>

          <div className="flex gap-16 pt-20">
            <div>
              <div className="flex justify-between items-center min-w-[600px] pb-12">
                <p className="font-bold text-xl">Top Artists of All Time</p>
                <NavLink to="/top_artists">
                  <Button text="See More" onClick={() => {}} />
                </NavLink>
              </div>
              {topArtistsDiv}
            </div>
            <div>
              <div className="flex gap-3 items-center justify-between min-w-[600px] pb-12">
                <p className="font-bold text-xl">Top Tracks of All Time</p>
                <NavLink to="/top_tracks">
                  <Button text="See More" onClick={() => {}} />
                </NavLink>
              </div>
              {topTracksDiv}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
