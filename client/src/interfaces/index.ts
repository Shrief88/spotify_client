export interface UserInfo{
  country : string,
  display_name : string,
  followers:{
    total : number,
  },
  images: Array<Image>
}

export interface TopArtists{
  itmes : Array<Artist>,
}

export interface TopTracks{
  items : Array<Track>,
}

export interface UserPlaylists{
  items : Array<Playlist>
}

interface Image {
  url : string,
  height : number,
  width : number
}

export interface Artist{
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

interface Playlist{
  description : string,
  external_urls : {
    spotify : string,
  },
  id : string,
  images : Array<Image>,
  name : string,
  tracks : {
    total : number,
  }
}











