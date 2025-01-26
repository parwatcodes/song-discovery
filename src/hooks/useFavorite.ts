import { useQuery, useQueryClient } from '@tanstack/react-query';

interface Album {
  id: string;
  title: string;
  thumb: string;
}

interface Artist {
  id: string;
  name: string;
}

interface Favorites {
  albums: Album[];
  artists: Artist[];
}

const initialFavorites: Favorites = {
  albums: [],
  artists: [],
};

const useFavorite = () => {
  const queryClient = useQueryClient();


  // Load favorites from localStorage
  const loadFavorites = (): Favorites => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : initialFavorites;
  };

  // Save favorites to localStorage
  const saveFavorites = (favorites: Favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const { data: favorites } = useQuery({
    queryKey: ['favorites'],
    initialData: loadFavorites,
  });


  const addAlbumToFavorites = (id: any, album: Album) => {
    queryClient.setQueryData<Favorites>(['favorites'], (oldFavorites) => {
      if (!oldFavorites) {
        oldFavorites = { albums: [], artists: [] };
      }

      if (!oldFavorites.albums.some((a) => a.id === album.id)) {
        const updatedFavorites = { ...oldFavorites, albums: [...oldFavorites.albums, album] };
        saveFavorites(updatedFavorites);

        return updatedFavorites;
      } else {
        return oldFavorites;
      }
    });

    // Log the latest state after the update
    const updatedFavorites = queryClient.getQueryData<Favorites>(['favorites']);
    console.log('Updated Favorites:', updatedFavorites);
  };

  const removeAlbumFromFavorites = (albumId: string) => {
    queryClient.setQueryData<Favorites>(['favorites'], (oldFavorites) => {
      if (!oldFavorites) return initialFavorites;

      const updatedFavorites = {
        ...oldFavorites,
        albums: oldFavorites.albums.filter((album) => album.id !== albumId),
      };
      saveFavorites(updatedFavorites);
      return updatedFavorites;
    });
  };

  const addArtistToFavorites = (id: any, artist: Artist) => {
    queryClient.setQueryData<Favorites>(['favorites'], (oldFavorites) => {
      if (!oldFavorites) {
        oldFavorites = { albums: [], artists: [] };
      }

      if (!oldFavorites.artists.some((a) => a.id === artist.id)) {
        const updatedFavorites = { ...oldFavorites, artists: [...oldFavorites.artists, artist] };
        saveFavorites(updatedFavorites);
        return updatedFavorites;
      } else {
        return oldFavorites;
      }
    });


    const updatedFavorites = queryClient.getQueryData<Favorites>(['favorites']);
    console.log('Updated Favorites:', updatedFavorites);
  };

  const removeArtistFromFavorites = (artistId: string) => {
    queryClient.setQueryData<Favorites>(['favorites'], (oldFavorites) => {
      if (!oldFavorites) return initialFavorites;

      const updatedFavorites = {
        ...oldFavorites,
        artists: oldFavorites.artists.filter((artist) => artist.id !== artistId),
      };
      saveFavorites(updatedFavorites);
      return updatedFavorites;
    });
  };

  const getFavorites = () => queryClient.getQueryData<Favorites>(['favorites']) || initialFavorites;

  const isAlbumFavorite = (albumId: string) => {
    const favorites = getFavorites();
    return favorites.albums.some((album) => album.id === albumId);
  };

  const isArtistFavorite = (artistId: string) => {
    const favorites = getFavorites();
    return favorites.artists.some((artist) => artist.id === artistId);
  };

  return {
    favorites,
    isAlbumFavorite,
    isArtistFavorite,
    addAlbumToFavorites,
    removeAlbumFromFavorites,
    addArtistToFavorites,
    removeArtistFromFavorites,
  };
};

export default useFavorite;
