export interface Artist{ 
  name : string;
  imageUrl : string;
}

export interface User {
  display_name: string;
  followers: number;
  imageUrl: string;
  playlists: number;
  following: number;
}

export interface Track{
  name : string;
  artistName : string;
  albumName : string;
  duration : string;
  imageUrl : string;
}