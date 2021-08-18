import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Tests Favorite Pokémons page', () => {
  it('shows the correct message if there are no favorire pokemons', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const noFavoritesText = screen.getByText(/No favorite pokemon found/);
    expect(noFavoritesText).toBeInTheDocument();
  });
  it('shows all favorited pokemons', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/More details/i));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const FavoriteText = screen.getByTestId('pokemon-name');
    expect(FavoriteText).toBeInTheDocument();
    expect(FavoriteText.innerHTML).toBe('Pikachu');
  });
});
