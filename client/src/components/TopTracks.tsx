import MyButton from "./MyButton";
import { Track } from "../interfaces";

interface TopTracksProps {
  title: string;
  tracks: Array<Track>;
}

const TopTracks = (props: TopTracksProps) => {
  const artists = props.tracks.map((item) => (
    <div key={item.name} className="flex items-center justify-between gap-5 pb-5">
      <div className="flex gap-5">
        <div className="avatar">
          <div className="w-12 rounded">
            <img src={item.imageUrl} />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-base">{item.name}</p>
          <p className="text-sm text-lightGrey">
            {item.artistName} . {item.albumName}
          </p>
        </div>
      </div>
      <div className="justify-end text-sm text-lightGrey">{item.duration}</div>
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

export default TopTracks;
