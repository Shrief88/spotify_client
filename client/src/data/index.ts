import { getAccessToken } from "../auth";
import axios from "axios";
import { IArtist, IPlaylist, ITrack, IUser } from "../interfaces";

const token = getAccessToken();

axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers["Authorization"] = `Bearer ${token}`;
axios.defaults.headers["Content-type"] = "application/json";

export const getCurrentUser = async (): Promise<IUser> =>
  (await axios.get("/me")).data;

export const getUserPlaylists = async (): Promise<IPlaylist[]> =>
  (await axios.get("/me/playlists?limit=50")).data.items;

export const getFollowingArtistsNumber = async (): Promise<number> =>
  (await axios.get("/me/following?type=artist")).data.artists.total;

export const getUserTopArtists = async (
  time_range: string,
  limit: number,
): Promise<IArtist[]> =>
  (await axios.get(`/me/top/artists?time_range=${time_range}&limit=${limit}`))
    .data.items;

export const getUserTopTracks = async (
  time_range: string,
  limit: number,
): Promise<ITrack[]> =>
  (await axios.get(`/me/top/tracks?time_range=${time_range}&limit=${limit}`))
    .data.items;

export const getRecentlyPlayed = () => axios.get("/me/player/recently-played");
