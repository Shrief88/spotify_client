export interface IUser{
  country : string,
  display_name : string,
  followers:{
    total : number,
  },
  images: Array<Image>
  following : number,
  playlists : number,
}


interface Image {
  url : string,
  height : number,
  width : number
}

export interface IArtist{
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

export interface ITrack{
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

export interface IPlaylist{
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











