# Song Discovery

## Overview

Song Discovery is a web application that allows users to discover new music albums. Users can filter albums by year, genre, and country, and view album details, bookmark albums, songs, artists to their favs.

https://songs-discovery-e8gogb4lh-parwats-projects.vercel.app

## Features

- Browse and discover new music albums
- Filter albums by year, genre, and country
- View album details

## Technologies Used

- React
- TypeScript
- React Query (for state management, caching and many more)
- Styled Components

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

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
3. Create a .env file in the root directory and add your API base URL:
    ```sh
    # .env
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
