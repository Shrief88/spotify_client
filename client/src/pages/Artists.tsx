import { Artist } from "../interfaces";

interface artistProps {
  artists: Array<Artist>;
}

const Artists = (props: artistProps) => {
  const artistsAvatar = props.artists.map((item) => (
    <div key={item.name} className="flex flex-col items-center gap-3">
      <div className="avatar">
        <div className="w-44 rounded-full">
          <img src={item.imageUrl} />
        </div>
      </div>
      <div>{item.name}</div>
    </div>
  ));
  return (
    <div className="px-60 py-16">
      <div className="pb-12 flex justify-between">
        <p className="text-2xl font-bold">Top Artists</p>
        <div className="flex gap-6 text-sm">
          <p>All Time</p>
          <p>Last 6 Months</p>
          <p>Last 4 Weeks</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-8  justify-center">
        {artistsAvatar}
      </div>
    </div>
  );
};

export default Artists;
