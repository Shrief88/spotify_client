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