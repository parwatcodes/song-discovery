# Song Discovery

![graph](https://github.com/user-attachments/assets/14e41c30-5727-48e0-b8f3-f3954a2cbac3)

## Detailed documentation

https://docs.google.com/document/d/1H2BgyWttFu6OacthIx3BD2SieEHswNeIH8Vwmuf7bg4/edit?usp=sharing

## Overview

Song Discovery is a web application that allows users to discover new music albums. Users can filter albums by year, genre, and country, and view album details, bookmark albums, songs, artists to their favs.

https://songs-discovery.vercel.app/

## Features

- Browse and discover new music albums
- Free search for Artist, Albums, genre, country and many more
- Filter albums by year, genre, and country
- View Artists and their albums
- View album details
- Add albums to favorite and view them from albums page or a separate Favorite page


## Technologies Used

- React
- TypeScript
- React Query (for state management, caching and many more)
- Styled Components

## Client Routes

The Song Discovery app uses React Router for client-side routing. Here are the main routes:

- Home (/): The home page where users can search and filter albums.
- Album Details (/album/:id): The page that displays detailed information about a specific album.
- Artist Details (/artists/:id): The page that displays detailed information about a specific artist and their albums.
- Favorite (/favorites): The page that displays the user's favorite albums and artists.

## Getting Started

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/song-discovery-by-layla.git

   cd song-discovery-by-layla
2. Install dependencies:
    ```sh
   npm install
    # or
    yarn install
3. Create a .env.local file in the root directory and add your API base URL:
    ```sh
    # .env.local
    VITE_DISCOGS_API_KEY=YOUR_API_KEY
    VITE_DISCOGS_API_SECRET=YOUR_API_SECRET

    VITE_DISCOGS_TOKEN_URL=https://api.discogs.com/oauth/request_token
    VITE_DISCOGS_AUTHORIZE_URL=https://www.discogs.com/oauth/authorize
    VITE_DISCOGS_ACCESS_TOKEN_URL=https://api.discogs.com/oauth/access_token

    VITE_DISCOGS_BASE_URL=https://api.discogs.com
### Running the Application
  1. Start the development server
      ```sh
     npm run dev
  2. Open your browser and navigate to http://localhost:5173.
