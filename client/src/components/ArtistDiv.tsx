interface ArtistDivProps {
  name : string;
  url : string
}

const ArtistDiv = (props : ArtistDivProps) =>{
  return(
    <div className="flex items-center gap-10 py-3">
      <img src={props.url} className="w-14 rounded-full"/>
      <p>{props.name}</p>
    </div>
  )
}

export default ArtistDiv;