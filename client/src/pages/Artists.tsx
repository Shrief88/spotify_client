import { useEffect, useState } from "react";
import { getUserTopArtists } from "../data";
import { IArtist } from "../interfaces";
import Loader from "../components/Loader";
import { TimeRange, timeRangesValues } from "../components/TimeRange";

const Artists = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [topArtistsList, setTopArtistsList] = useState<JSX.Element[]>([]);
  const [topArtists, setTopArtists] = useState<IArtist[][]>([]);
  const [activeRange, setActiveRange] =
    useState<keyof typeof timeRangesValues>("long");

  const handleRangeToggle = (range: keyof typeof timeRangesValues) => {
    setActiveRange(range);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const artistsData = [
        await getUserTopArtists("short_term", 20),
        await getUserTopArtists("medium_term", 20),
        await getUserTopArtists("long_term", 20),
      ];
      setTopArtists(artistsData);
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
      const mappedArtists = topArtists[timeRangesValues[activeRange]].map(
        (item: IArtist) => {
          return (
            <div key={item.id} className="flex items-center gap-2 flex-col">
              <img
                src={item.images[0].url}
                className=" object-cover h-24 rounded-full w-24 md:w-40 md:h-40 xl:w-52 xl:h-52 hover:opacity-50"
              />
              <p>{item.name}</p>
            </div>
          );
        },
      );
      setTopArtistsList(mappedArtists);
    }
  }, [activeRange, topArtists]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-6 xl:p-32">
          <div className="flex justify-between mb-5">
            <p className="font-black text-lg xl:text-2xl">Top Artists</p>
            <TimeRange
              activeRange={activeRange}
              handleRangeToggle={handleRangeToggle}
            />
          </div>
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{topArtistsList}</div>
        </div>
      )}
    </>
  );
};

export default Artists;
