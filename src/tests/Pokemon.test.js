import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Tests if the pokémon card', () => {
  it('has the name of the pokemon displayed', () => {
    const pikachu = pokemons[0];
    renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        showDetailsLink={ false }
        isFavorite={ false }
      />,
    );
    const name = screen.getByTestId('pokemon-name');
    expect(name.innerHTML).toBe(pikachu.name);
  });
  it('has the type of the pokemon displayed', () => {
    const pikachu = pokemons[0];
    renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        showDetailsLink={ false }
        isFavorite={ false }
      />,
    );
    const type = screen.getByTestId('pokemon-type');
    expect(type.innerHTML).toBe(pikachu.type);
  });
  it('has the name of the pokemon displayed', () => {
    const pikachu = pokemons[0];
    const { value, measurementUnit } = pikachu.averageWeight;
    renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        showDetailsLink={ false }
        isFavorite={ false }
      />,
    );
    const name = screen.getByTestId('pokemon-weight');
    expect(name.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
  });
  it('has an image of the pokemon displayed', () => {
    const pikachu = pokemons[0];
    renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        showDetailsLink={ false }
        isFavorite={ false }
      />,
    );
    const image = screen.getByAltText(/Pikachu sprite/);
    expect(image.src).toBe(pikachu.image);
  });
  it('has the star icon when favorited', () => {
    const pikachu = pokemons[0];
    renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        showDetailsLink={ false }
        isFavorite
      />,
    );
    const favImage = screen.getByAltText(/Pikachu is marked as favorite/);
    expect(favImage.src).toMatch(/\/star-icon.svg/);
  });
});
describe('Tests if the pokémon card loaded from Pokédex', () => {
  it('has the details button', () => {
    const pikachu = pokemons[0];
    renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        showDetailsLink
        isFavorite={ false }
      />,
    );
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });
  it('redirects to the proper pokémon page when clicked', () => {
    const pikachu = pokemons[0];
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    const detailsLink = links.filter((link) => link.innerHTML === 'More details');
    userEvent.click(detailsLink[0]);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pikachu.id}`);
  });
});
