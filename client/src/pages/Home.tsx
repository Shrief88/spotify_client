import { IUser, ITrack, IArtist } from "../interfaces";
import UserInfoItem from "../components/userInfoItem";
import Button from "../components/Button";
import { logout } from "../auth";
import TrackDiv from "../components/TrackDiv";
import { useEffect, useState } from "react";
import {
  getCurrentUser,
  getFollowingArtistsNumber,
  getUserPlaylists,
  getUserTopArtists,
  getUserTopTracks,
} from "../data";
import Loader from "../components/Loader";
import { NavLink } from "react-router-dom";

function Home() {
  const [user, setUser] = useState<null | IUser>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [topArtists, setTopArtists] = useState<IArtist[]>([]);
  const [topTracks, setTopTracks] = useState<ITrack[]>([]);

  const [topArtistsList, setTopArtistsList] = useState<JSX.Element[]>([]);
  const [topTracksList, setTopTracksList] = useState<JSX.Element[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const userData: IUser = await getCurrentUser();
      const playlistsData = await getUserPlaylists();
      userData.playlists = playlistsData.length;
      userData.following = await getFollowingArtistsNumber();

      const artistsData = await getUserTopArtists("long_term", 10);
      const tracksData = await getUserTopTracks("long_term", 10);

      setPlaylists(playlistsData);
      setTopArtists(artistsData);
      setTopTracks(tracksData);
      setUser(userData);

      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (topArtists.length > 0) {
      const mappedArtists = topArtists.map((item: IArtist) => {
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
      setTopArtistsList(mappedArtists);
    }
  }, [topArtists]);

  useEffect(() => {
    if (topTracks.length > 0) {
      const mappedTracks = topTracks.map((item: ITrack) => {
        return (
          <TrackDiv
            key={item.id}
            name={item.name}
            url={item.album.images[0].url}
            artists={item.artists}
            duration={item.duration_ms}
            album={item.album.name}
          />
        );
      });
      setTopTracksList(mappedTracks);
    }
  }, [topTracks]);

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

          <div className="grid grid-cols-1 gap-16 pt-20 px-6 lg:grid-cols-2">
            <div>
              <div className="flex justify-between items-center ">
                <p className="font-bold text-base">Top Artists of All Time</p>
                <NavLink to="/top_artists">
                  <Button text="See More" onClick={() => {}} />
                </NavLink>
              </div>
              {topArtistsList}
            </div>
            <div>
              <div className="flex gap-3 items-center justify-between ">
                <p className="font-bold text-base">Top Tracks of All Time</p>
                <NavLink to="/top_tracks">
                  <Button text="See More" onClick={() => {}} />
                </NavLink>
              </div>
              {topTracksList}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
