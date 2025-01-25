import DiscogsService from "./DiscogsService";

export const getAlbums = (query: {[key: string]: string | number}) => DiscogsService.search(query);
export const getAlbum = (releaseId: string) => DiscogsService.getAlbumDetails(releaseId);
export const getArtistAlbums = (artistId: string) => DiscogsService.getArtistAlbums(artistId);
