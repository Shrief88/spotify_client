export interface IUser {
  country: string;
  display_name: string;
  followers: {
    total: number;
  };
  images: Image[];
  following: number;
  playlists: number;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

export interface IArtist {
  popularity: number;
  name: string;
  images: Image[];
  id: string;
  genres: string[];
  followers: {
    total: number;
  };
  external_urls: {
    spotify: string;
  };
}

export interface IRecentPlayerTrack {
  played_at: string;
  track: ITrack;
}

export interface ITrack {
  album: {
    name: string;
    images: Image[];
  };
  artists: IArtist[];
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
  id: string;
  name: string;
  popularity: number;
}

export interface IPlaylist {
  description: string;
  external_urls: {
    spotify: string;
  };
  id: string;
  images: Image[];
  name: string;
  tracks: {
    total: number;
  };
}
