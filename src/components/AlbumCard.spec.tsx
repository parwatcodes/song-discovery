import { render, screen, fireEvent } from '@testing-library/react';
import AlbumCard from './AlbumCard';
import useFavorite from '../hooks/useFavorite';

jest.mock('../hooks/useFavorite');

const mockUseFavorite = useFavorite as jest.MockedFunction<typeof useFavorite>;

describe('AlbumCard', () => {
  const album = {
    id: '1',
    cover_image: 'https://via.placeholder.com/150',
    title: 'Test Album',
    year: '2021',
    country: 'USA',
  };

  beforeEach(() => {
    mockUseFavorite.mockReturnValue({
      isAlbumFavorite: jest.fn().mockReturnValue(false),
      addAlbumToFavorites: jest.fn(),
      removeAlbumFromFavorites: jest.fn(),
    });
  });

  it('renders album details', () => {
    render(<AlbumCard album={album} />);
    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
  });

  it('toggles favorite status on bookmark click', () => {
    render(<AlbumCard album={album} />);
    const bookmarkIcon = screen.getByText('🤍');
    fireEvent.click(bookmarkIcon);
    expect(mockUseFavorite().addAlbumToFavorites).toHaveBeenCalledWith(album);
  });

  it('removes from favorites on bookmark click if already favorite', () => {
    mockUseFavorite.mockReturnValue({
      isAlbumFavorite: jest.fn().mockReturnValue(true),
      addAlbumToFavorites: jest.fn(),
      removeAlbumFromFavorites: jest.fn(),
    });

    render(<AlbumCard album={album} />);
    const bookmarkIcon = screen.getByText('❤️');
    fireEvent.click(bookmarkIcon);
    expect(mockUseFavorite().removeAlbumFromFavorites).toHaveBeenCalledWith(album.id);
  });
});
