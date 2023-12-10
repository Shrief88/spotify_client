import { useEffect, useState } from "react";
import { type IRecentPlayerTrack } from "../interfaces";
import { getRecentlyPlayed } from "../data";
import TrackDiv from "../components/TrackDiv";
import Loader from "../components/Loader";

const Recent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recentTracks, setRecentTracks] = useState<IRecentPlayerTrack[]>([]);
  const [recentTracksList, setRecentTracksList] = useState<JSX.Element[]>([]);

  const fetchData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const tracksData = await getRecentlyPlayed();
      setRecentTracks(tracksData);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (recentTracks.length > 0) {
      const mappedTracks = recentTracks.map((item: IRecentPlayerTrack) => {
        return (
          <TrackDiv
            name={item.track.name}
            url={item.track.album.images[0].url}
            artists={item.track.artists}
            duration={item.track.duration_ms}
            album={item.track.album.name}
          />
        );
      });
      setRecentTracksList(mappedTracks);
    }
  }, [recentTracks]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-6 xl:p-32">
          <div className="flex justify-between mb-5">
            <p className="font-black text-lg xl:text-2xl">
              Recent Played Tracks
            </p>
          </div>
          <div>{recentTracksList}</div>
        </div>
      )}
    </>
  );
};

export default Recent;
