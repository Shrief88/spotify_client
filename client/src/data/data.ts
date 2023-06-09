import axios from "axios";

const access_token = localStorage.getItem("access_token");
const axiosClient = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  },
});

export const getCurrentUser = () => axiosClient.get('/me');

export const getUserPlaylist = () => axiosClient.get('/me/playlists')

export const getFollowingArtist = () => axiosClient.get('/me/following?type=artist')

export const getTopArtists = () => axiosClient.get('/me/top/artists?time_range=long_term')

export const getTopTracks = () => axiosClient.get('/me/top/tracks?time_range=long_term')
