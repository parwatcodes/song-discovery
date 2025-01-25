import queryString from "query-string";

export const getStringifiedQuery = (query: Record<string, string>) => {
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
