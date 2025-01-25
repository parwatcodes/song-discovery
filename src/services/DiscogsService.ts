import queryString from "query-string";

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

  private static getStringifiedQuery(query: Record<string, string>) {
    if (Object.keys(query).length === 0) {
      return '';
    }

    const { searchText, ...otherParams } = query;
    let stringifiedQuery = '';

    if (searchText) {
      stringifiedQuery = `q=${encodeURIComponent(searchText)}`;
    }

    const additionalParams = queryString.stringify(otherParams);

    if (additionalParams) {
      stringifiedQuery += `&${additionalParams}`;
    }

    return stringifiedQuery;
  }

  static async search(query: Record<string, string> = {}) {
    try {
      const q = this.getStringifiedQuery(query);

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

  static getArtistAlbums = async (artistId) => {
    try {
      const response = await fetch(`${DISCOGS_API_BASE_URL}/artists/${artistId}/releases?key=${DISCOGS_API_KEY}&secret=${DISCOGS_API_SECRET}`);

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
