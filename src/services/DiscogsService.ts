import { getStringifiedQuery } from '../utils/helpers';

const DISCOGS_API_KEY = import.meta.env.VITE_DISCOGS_API_KEY;
const DISCOGS_API_SECRET = import.meta.env.VITE_DISCOGS_API_SECRET;
const DISCOGS_API_BASE_URL = import.meta.env.VITE_DISCOGS_BASE_URL;

class DiscogsService {
  private static baseUrl = `${DISCOGS_API_BASE_URL}`;

  private static appendSecrets(url: string) {
    return `${url}&key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET}`;
  }

  private static async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return response.json();
  }

  static async search(query: Record<string, string> = {}) {
    const q = getStringifiedQuery(query);
    const url = this.appendSecrets(`${this.baseUrl}/database/search?${q}`);
    const response = await fetch(url);

    return this.handleResponse(response);
  }

  static getAlbumDetails = async (releaseId: string) => {
    const response = await fetch(`${this.baseUrl}/releases/${releaseId}`);

    return this.handleResponse(response);
  };

  static getArtistAlbums = async (artistId: string, query: Record<string, string> = {}) => {
    const q = getStringifiedQuery(query);
    const url = this.appendSecrets(`${this.baseUrl}/artists/${artistId}/releases?${q}`);
    const response = await fetch(url);

    return this.handleResponse(response);
  };
}

export default DiscogsService;
