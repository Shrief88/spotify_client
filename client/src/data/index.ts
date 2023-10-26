import { getAccessToken } from "../auth";
import axios from "axios";

const token = getAccessToken();

axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers["Authorization"] = `Bearer ${token}`;
axios.defaults.headers["Content-type"] = "application/json";

export const getCurrentUser = () => axios.get("/me");

export const getUserTopArtists = (time_range: string, limit: number) =>
  axios.get(`/me/top/artists?time_range=${time_range}&limit=${limit}`);

export const getUserTopTracks = (time_range: string, limit: number) =>
  axios.get(`/me/top/tracks?time_range=${time_range}&limit=${limit}`);

export const getUserPlaylists = () => axios.get("/me/playlists?limit=50");

export const getFollowingArtists = () => axios.get("/me/following?type=artist");
