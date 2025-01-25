import { getStringifiedQuery } from '../utils/helpers'

const DISCOGS_API_KEY = import.meta.env.VITE_DISCOGS_API_KEY;
const DISCOGS_API_SECRET = import.meta.env.VITE_DISCOGS_API_SECRET;
const DISCOGS_API_BASE_URL = import.meta.env.VITE_DISCOGS_BASE_URL;

class DiscogsService {

  private searchUrl = `${DISCOGS_API_BASE_URL}/database/search`;

  private static async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
  }

  static async search(query: Record<string, string> = {}) {
    try {
      const q = getStringifiedQuery(query);

      const response = await fetch(`${DISCOGS_API_BASE_URL}/database/search?${q}&key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET}`)

      return await this.handleResponse(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static getAlbumDetails = async (releaseId) => {
    try {
      const response = await fetch(`${DISCOGS_API_BASE_URL}/releases/${releaseId}?key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching album details:', error);
    }
  };

  static getArtistAlbums = async (artistId, query) => {
    try {
      const q = getStringifiedQuery(query);

      const response = await fetch(`${DISCOGS_API_BASE_URL}/artists/${artistId}/releases?${q}&key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching album details:', error);
    }
  };
}

export default DiscogsService;
