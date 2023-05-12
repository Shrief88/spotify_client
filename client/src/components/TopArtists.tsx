import MyButton from "./MyButton";
import { Artist } from "../interfaces";

interface TopArtistsProps {
  title: string;
  artists: Array<Artist>;
}

const TopArtists = (props: TopArtistsProps) => {

  const artists = props.artists.map((item) => (
    <div className="flex items-center gap-5 pb-5">
      <div className="avatar">
        <div className="w-12 rounded-full">
          <img src={item.imageUrl} />
        </div>
      </div>
      <div>{item.name}</div>
    </div>
  ));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="font-bold text-lg pb-10">{props.title}</div>
        <MyButton title="See More" onClick={() => {}}></MyButton>
      </div>
      {artists}
    </div>
  );
};

export default TopArtists;
