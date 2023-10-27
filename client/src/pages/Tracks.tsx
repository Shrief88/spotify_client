import { useEffect, useState } from "react";
import { TopTracks } from "../interfaces";
import { getUserTopTracks } from "../data";
import { Track } from "../interfaces";
import Loader from "../components/Loader";
import TrackDiv from "../components/TrackDiv";
import { TimeRange, timeRangesValues } from "../components/TimeRange";

const Tracks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [topTracks, setTopTracks] = useState<TopTracks[]>([]);
  const [activeRange, setActiveRange] =
    useState<keyof typeof timeRangesValues>("long");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const artistsData = [
          (await getUserTopTracks("short_term", 20)).data,
          (await getUserTopTracks("medium_term", 20)).data,
          (await getUserTopTracks("long_term", 20)).data,
        ];
        setTopTracks(artistsData);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  const topTracksDiv = topTracks[timeRangesValues[activeRange]]?.items.map(
    (item: Track) => {
      return (
        <TrackDiv
          name={item.name}
          url={item.album.images[0].url}
          artists={item.artists}
          duration={item.duration_ms}
          album={item.album.name}
        />
      );
    },
  );

  const handleRangeToggle = (range: keyof typeof timeRangesValues) => {
    setActiveRange(range);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="px-72 py-32">
          <div className="flex justify-between mb-5">
            <p className="font-black text-2xl">Top Tracks</p>
            <TimeRange
              activeRange={activeRange}
              handleRangeToggle={handleRangeToggle}
            />
          </div>

          <div>{topTracksDiv}</div>
        </div>
      )}
    </>
  );
};

export default Tracks;
