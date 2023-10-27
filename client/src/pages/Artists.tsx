import { useEffect, useState } from "react";
import { TopArtists } from "../interfaces";
import { getUserTopArtists } from "../data";
import { Artist } from "../interfaces";
import Loader from "../components/Loader";
import { TimeRange, timeRangesValues } from "../components/TimeRange";

const Artists = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [topArtists, setTopArtists] = useState<TopArtists[]>([]);
  const [activeRange, setActiveRange] =
    useState<keyof typeof timeRangesValues>("long");

  const handleRangeToggle = (range: keyof typeof timeRangesValues) => {
    setActiveRange(range);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const artistsData = [
          (await getUserTopArtists("short_term", 20)).data,
          (await getUserTopArtists("medium_term", 20)).data,
          (await getUserTopArtists("long_term", 20)).data,
        ];
        setTopArtists(artistsData);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  const topArtistsDiv = topArtists[timeRangesValues[activeRange]]?.items.map(
    (item: Artist) => {
      return (
        <div className="flex flex-col items-center gap-5 py-3">
          <img
            src={item.images[0].url}
            className=" object-cover h-48 rounded-full w-48 hover:opacity-50"
          />
          <p>{item.name}</p>
        </div>
      );
    },
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="px-72 py-32">
          <div className="flex justify-between mb-5">
            <p className="font-black text-2xl">Top Artists</p>
            <TimeRange
              activeRange={activeRange}
              handleRangeToggle={handleRangeToggle}
            />
          </div>
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}>
            {topArtistsDiv}
          </div>
        </div>
      )}
    </>
  );
};

export default Artists;
