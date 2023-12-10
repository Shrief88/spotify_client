import { IArtist } from "../interfaces";

interface TrackDivProps {
  url: string;
  name: string;
  artists: Array<IArtist>;
  album: string;
  duration: number;
}

const formatTime = (time_ms: number) => {
  const minutes = Math.floor(time_ms / 60000);
  const seconds = ((time_ms % 60000) / 1000).toFixed(0);

  return `${minutes}:${seconds}`;
};

const TrackDiv = (props: TrackDivProps) => {
  const artists = props.artists.map((item: IArtist, index, arr) => {
    if (arr.length - 1 === index) {
      return <p key={item.id}>{item.name}</p>;
    } else {
      return <p key={item.id}>{item.name},</p>;
    }
  });

  return (
    <div className="flex items-center py-3 justify-between">
      <div className="flex gap-5 items-center">
        <img src={props.url} className="w-14 hover:opacity-50" />
        <div className="flex flex-col items-start text-start">
          <p>{props.name}</p>
          <div className="flex flex-col text-gray text-sm items-start text-start">
            <div className="flex">{artists}</div>
            <p>{props.album}</p>
          </div>
        </div>
      </div>

      <p className="text-gray text-sm">{formatTime(props.duration)}</p>
    </div>
  );
};

export default TrackDiv;
