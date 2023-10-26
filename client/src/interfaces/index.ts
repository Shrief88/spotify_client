export interface UserInfo{
  country : string,
  display_name : string,
  followers:{
    total : number,
  },
  images: Array<Image>
  following : number,
  playlists : number,
}

export interface TopArtists{
  items : Array<Artist>,
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

export interface Track{
  album :{
    name:string,
    images : Array<Image>
  },
  artists : Array<Artist>,
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











