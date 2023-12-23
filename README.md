# spotify_client
A web app for visualizing personalized Spotify data using Node and React.

Built with a bunch of things, but to name a few:

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
- [Reach Router](https://reach.tech/router)
- [Tailwind](https://tailwindcss.com/)

## Setup Backend

1. [Register a Spotify App](https://developer.spotify.com/dashboard/applications) and add `http://localhost:3000/callback` as a Redirect URI in the app settings
1. Create an `.env` file in the root of the project based on `server/env.example`
1. `cd server && npm install`
1. `npm run server`

## Setup Frontend

1. `cd clinet && npm install`
1. `npm run dev`

## Deployment 
The frontend has deployed on : https://main--dapper-centaur-a349e0.netlify.app/

The Backend app has deployed on : https://spotify-client-8xcf.onrender.com/

Please note that due to Spotify's restrictions on app in development mode, only users on the allowlist can access this app. If you're interested, please send me your email and username for consideration

## Screenshots
![Screenshot](screenshots/home.png)
![Screenshot](screenshots/playlist.png)
![Screenshot](screenshots/top_artists.png)
![Screenshot](screenshots/top_tracks.png)
