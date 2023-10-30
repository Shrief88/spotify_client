import { useEffect, useState } from "react";
import { UserPlaylists, Playlist } from "../interfaces";
import { getUserPlaylists } from "../data";
import Loader from "../components/Loader";

const Playlists = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userPlaylists, setUserPlaylists] = useState<UserPlaylists | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const playlistsData = (await getUserPlaylists()).data;
        setUserPlaylists(playlistsData);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const userPlaylistsDiv = userPlaylists?.items.map((item: Playlist) => {
    return (
      <div key={item.id} className="flex flex-col items-center gap-5 py-3">
        <img src={item.images[0].url} className="object-cover h-56 w-56 hover:opacity-50"/>
        <div>
          <p>{item.name}</p>
          <p className="text-gray text-xs">{item.tracks.total} TRACKS</p>
        </div>
      </div>
    );
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="px-72 py-32">
          <div className="flex justify-between mb-5">
            <p className="font-black text-2xl">Your Playlist</p>
          </div>
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}>
            {userPlaylistsDiv}
          </div>
        </div>
      )}
    </>
  );
};

export default Playlists;
