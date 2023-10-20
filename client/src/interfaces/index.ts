export interface UserInfo{
  country : string,
  display_name : string,
  followers:{
    total : number,
  },
  images: Array<Image>
}

interface Image {
  url : string,
  height : number,
  width : number
}


export interface TopArtists{
  itmes : Array<Artist>,
}

interface Artist{
  popularity : number,
  name : string,
  images : Array<Image>,
  id : string,
  genres : Array<string>,
  followers : {
    total : number,
  },
  external_urls : {
    spotify : string,
  }
}

export interface TopTracks{
  items : Array<Track>,
}

interface Track{
  album :{
    name:string,
  },
  artists : Array<string>,
  duration_ms: number,
  external_urls : {
    spotify : string,
  },
  id : string,
  name :string,
  popularity : number 
}













