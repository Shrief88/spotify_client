import { getAccessToken } from "../auth";
import axios from "axios";

const token = getAccessToken();

axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers['Authorization'] = `Bearer ${token}`;
axios.defaults.headers['Content-type'] = 'application/json';

export const getCurrentUser = ()=> axios.get('/me');

export const getUserTopArtists = ()=> axios.get('/me/top/artists?time_range=long_term');

export const getUserTopTracks = ()=> axios.get('/me/top/tracks?time_range=long_term');