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

  const { data: favorites } = useQuery({
    queryKey: ['favorites'],
    initialData: { albums: [], artists: [] },
  });

  const addAlbumToFavorites = (id: any, album: Album) => {
    queryClient.setQueryData<Favorites>(['favorites'], (oldFavorites) => {
      if (!oldFavorites) {
        oldFavorites = { albums: [], artists: [] };
      }

      if (!oldFavorites.albums.some((a) => a.id === album.id)) {
        return {
          ...oldFavorites,
          albums: [...oldFavorites.albums, album],
        };
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

      return {
        ...oldFavorites,
        albums: oldFavorites.albums.filter((album) => album.id !== albumId),
      };
    });
  };

  const addArtistToFavorites = (id: any, artist: Artist) => {
    queryClient.setQueryData<Favorites>(['favorites'], (oldFavorites) => {
      if (!oldFavorites) {
        oldFavorites = { albums: [], artists: [] };
      }

      if (!oldFavorites.artists.some((a) => a.id === artist.id)) {
        return {
          ...oldFavorites,
          artists: [...oldFavorites.artists, artist],
        };
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

      return {
        ...oldFavorites,
        artists: oldFavorites.artists.filter((artist) => artist.id !== artistId),
      };
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
