import DiscogsService from "./DiscogsService";

export const getArtists = (query: {[key: string]: string | number}) => DiscogsService.search(query);
