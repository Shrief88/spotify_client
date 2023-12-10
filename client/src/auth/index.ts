import axios from "axios";

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem("accessToken"),
  refreshToken: window.localStorage.getItem("refreshToken"),
  expireTime: window.localStorage.getItem("expireTime"),
  timestamp: window.localStorage.getItem("timestamp"),
};

export const login = () => {
  window.location.href = "api/login";
};

const hasTokenExpired = () => {
  const { accessToken, expireTime, timestamp } = LOCALSTORAGE_VALUES;
  if (!accessToken || !expireTime) {
    return false;
  }

  const millSecondsElapsed = Date.now() - Number(timestamp);
  return millSecondsElapsed / 1000 > Number(expireTime);
};

const getNewToken = async () => {
  const { refreshToken } = LOCALSTORAGE_VALUES;
  if (!refreshToken || refreshToken === "undefined") {
    console.error("No refresh token available");
  }
  try {
    const { data } = await axios.get(
      `api/refresh_token?refresh_token=${refreshToken}`,
    );

    console.log(data);
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("expireTime", data.expires_in);
    localStorage.setItem("timestamp", String(Date.now()));

    window.location.reload();
  } catch (e) {
    console.error(e);
  }
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expireTime");
  localStorage.removeItem("timestamp");
  const url = new URL(window.location.href);
  url.search = ""; // Clear the search parameters
  const newUrl = url.toString(); // Get the updated URL without parameters
  window.history.replaceState({}, "", newUrl); // Replace the current URL without parameters
  window.location.reload();
};

export const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryParams = {
    accessToken: urlParams.get("access_token"),
    refreshToken: urlParams.get("refresh_token"),
    expireTime: urlParams.get("expires_in"),
  };

  if (hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === "undefined") {
    getNewToken();
  }

  if (
    LOCALSTORAGE_VALUES.accessToken &&
    LOCALSTORAGE_VALUES.accessToken !== "undefined"
  ) {
    return LOCALSTORAGE_VALUES.accessToken;
  }

  if (queryParams.accessToken) {
    for (const property in queryParams) {
      localStorage.setItem(property, queryParams[property]);
    }
    localStorage.setItem("timestamp", String(Date.now()));
    window.location.reload();
    return LOCALSTORAGE_VALUES.accessToken;
  }
};
