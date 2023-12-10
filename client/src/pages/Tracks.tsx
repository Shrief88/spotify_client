import { useEffect, useState } from "react";
import { getUserTopTracks } from "../data";
import { ITrack } from "../interfaces";
import Loader from "../components/Loader";
import TrackDiv from "../components/TrackDiv";
import { TimeRange, timeRangesValues } from "../components/TimeRange";

const Tracks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [topTracks, setTopTracks] = useState<ITrack[][]>([]);
  const [activeRange, setActiveRange] =
    useState<keyof typeof timeRangesValues>("long");
  const [topTracksList, setTopTracksList] = useState<JSX.Element[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const tracksData = [
        await getUserTopTracks("short_term", 20),
        await getUserTopTracks("medium_term", 20),
        await getUserTopTracks("long_term", 20),
      ];
      setTopTracks(tracksData);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (topTracks.length > 0) {
      const mappedTracks = topTracks[timeRangesValues[activeRange]].map(
        (item: ITrack) => {
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
      setTopTracksList(mappedTracks);
    }
  }, [activeRange, topTracks]);

  const handleRangeToggle = (range: keyof typeof timeRangesValues) => {
    setActiveRange(range);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-6 xl:p-32">
          <div className="flex justify-between mb-5">
            <p className="font-black text-lg xl:text-2xl">Top Tracks</p>
            <TimeRange
              activeRange={activeRange}
              handleRangeToggle={handleRangeToggle}
            />
          </div>

          <div>{topTracksList}</div>
        </div>
      )}
    </>
  );
};

export default Tracks;
