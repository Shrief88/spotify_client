import { useEffect, useState } from "react";
import { type IPlaylist } from "../interfaces";
import { getUserPlaylists } from "../data";
import Loader from "../components/Loader";

const Playlists = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userPlaylists, setUserPlaylists] = useState<IPlaylist[]>([]);
  const [playlistsList, setPlaylistsList] = useState<JSX.Element[]>([]);

  const fetchData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const playlistsData = await getUserPlaylists();
      setUserPlaylists(playlistsData);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userPlaylists.length > 0) {
      const mappedPlaylists = userPlaylists.map((item: IPlaylist) => {
        return (
          <div key={item.id} className="flex flex-col items-center gap-5 py-3">
            <img
              src={item.images[0].url}
              className="object-cover h-56 w-56 hover:opacity-50"
            />
            <div>
              <p>{item.name}</p>
              <p className="text-gray text-xs">{item.tracks.total} TRACKS</p>
            </div>
          </div>
        );
      });
      setPlaylistsList(mappedPlaylists);
    }
  }, [userPlaylists]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-6 xl:p-32">
          <div className="flex justify-between mb-5">
            <p className="font-black text-lg xl:text-2xl">Your Playlist</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {playlistsList}
          </div>
        </div>
      )}
    </>
  );
};

export default Playlists;
