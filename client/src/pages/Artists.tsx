import { useEffect, useState } from "react";
import { TopArtists } from "../interfaces";
import { getUserTopArtists } from "../data";
import { Artist } from "../interfaces";
import Loader from "../components/Loader";

const Artists = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [topArtists, setTopArtists] = useState<TopArtists[]>([]);
  const [activeRange, setActiveRange] = useState<number>(2);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const artistsData = [
        (await getUserTopArtists("short_term", 20)).data,
        (await getUserTopArtists("medium_term", 20)).data,
        (await getUserTopArtists("long_term", 20)).data,
      ];
      setTopArtists(artistsData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  console.log(topArtists);

  const topArtistsDiv = topArtists[activeRange]?.items.map((item: Artist) => {
    return (
      <div className="flex flex-col items-center gap-5 py-3">
        <img
          src={item.images[0].url}
          className=" object-cover h-48 rounded-full w-48"
        />
        <p>{item.name}</p>
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
            <p className="font-black text-2xl">Top Artists</p>
            <div className="flex gap-5">
              <button  className={activeRange === 2 ? '' : 'active:underline'} onClick={()=>setActiveRange(2)}>All Time</button>
              <button className={activeRange === 1 ? '' : 'active:underline'} onClick={()=>setActiveRange(1)}>Last 6 Months</button>
              <button className={activeRange === 0 ? '' : 'active:underline'} onClick={()=>setActiveRange(0)}>Last 4 Weeks</button>
            </div>
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
