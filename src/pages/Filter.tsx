import React from 'react';

import { YEARS, COUNTRIES, GENRES } from '../utils/constants';

interface FilterProps {
  filters: {
    year: string;
    genre: string;
    country: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleResetFilter: () => void;
}

const Filter: React.FC<FilterProps> = (props) => {
  const { filters, handleInputChange, handleResetFilter } = props;

  return (
    <div style={styles.filterContainer}>
      <div style={styles.form}>
        <div>
          <label>Year:</label>
          <select name="year" value={filters.year} onChange={handleInputChange}>
            <option value="">All</option>
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Genre:</label>
          <select name="genre" value={filters.genre} onChange={handleInputChange}>
            <option value="">All</option>
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Country:</label>
          <select name="country" value={filters.country} onChange={handleInputChange}>
            <option value="">All</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleResetFilter}>Clear filters</button>
      </div>
    </div>
  );
};

const styles = {
  filterContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '20px 20px 0 0',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
};

export default Filter;
