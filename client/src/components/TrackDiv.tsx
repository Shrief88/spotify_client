import { Artist } from "../interfaces";

interface TrackDivProps {
  url: string;
  name: string;
  artists: Array<Artist>;
  album: string;
  duration: number;
}

const formatTime = (time_ms: number) => {
  const minutes = Math.floor(time_ms / 60000);
  const seconds = ((time_ms % 60000) / 1000).toFixed(0);

  return `${minutes}:${seconds}`;
};

const TrackDiv = (props: TrackDivProps) => {
  const artists = props.artists.map((item: Artist, index, arr) => {
    if (arr.length - 1 === index) {
      return <p>{item.name} .</p>;
    } else {
      return <p>{item.name},</p>;
    }
  });

  return (
    <div className="flex items-center py-3 justify-between">
      <div className="flex gap-5 items-center">
        <img src={props.url} className="w-14 hover:opacity-50" />
        <div className="flex flex-col items-start">
          <p>{props.name}</p>
          <div className="flex text-gray">
            {artists}
            <p>&nbsp;{props.album}</p>
          </div>
        </div>
      </div>

      <p className="text-gray text-sm">{formatTime(props.duration)}</p>
    </div>
  );
};

export default TrackDiv;
