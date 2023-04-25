import { type SpotifyResponce } from "../../shared/interfaces";
import axios from "axios";
import querystring from "querystring";

const hasTokenExpired = () => {
  const timestamp = localStorage.getItem("timestamp");
  const expires_in = localStorage.getItem("expires_in");
  const millisecondElapsed = Date.now() - Number(timestamp);

  return millisecondElapsed / 1000 > Number(expires_in);
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expires_in");
  localStorage.removeItem("timestamp");
  window.location.reload();
};

const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    logout();
  } else {
    const queryParams = querystring.stringify({
      refresh_token: refresh_token,
    });

    try {
      const { data } : {data : SpotifyResponce} = await axios(
        `/refresh_token?${queryParams}`
      );
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("timestamp", Date.now() as unknown as string);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }
};



export const getAccessToken = (): string | boolean => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const hasError = urlParams.get("error");

  if (hasError || hasTokenExpired()) {
    refreshToken();
  }

  // if the user already loggind in before
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return access_token;
  }

  //if the user logged in for the first time
  if (urlParams.get("access_token")) {
    const queryParams: SpotifyResponce = {
      access_token: urlParams.get("access_token") as string,
      refresh_token: urlParams.get("refresh_token") as string,
      expires_in: urlParams.get("expires_in") as string,
    };

    for (const property in queryParams) {
      localStorage.setItem(
        property,
        queryParams[property as keyof SpotifyResponce]
      );
    }
    localStorage.setItem("timestamp", Date.now() as unknown as string);
  }

  return false;
};
