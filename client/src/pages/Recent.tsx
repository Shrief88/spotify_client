import { useEffect, useState } from "react";
import { Track } from "../interfaces";
import { getRecentlyPlayed } from "../data";
import TrackDiv from "../components/TrackDiv";
import Loader from "../components/Loader";

interface RecentPlayerTrack {
  played_at: string;
  track: Track;
}

interface RecentPlayerTracks {
  items: RecentPlayerTrack[];
}

const Recent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recentTracks, setRecentTracks] = useState<RecentPlayerTracks | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const tracksData = (await getRecentlyPlayed()).data;
        setRecentTracks(tracksData);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const topTracksDiv = recentTracks?.items.map((item: RecentPlayerTrack) => {
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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="px-72 py-32">
          <div className="flex justify-between mb-5">
            <p className="font-black text-2xl">Recent Played Tracks</p>
          </div>
          <div>{topTracksDiv}</div>
        </div>
      )}
    </>
  );
};

export default Recent;
