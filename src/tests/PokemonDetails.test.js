import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Tests if the pokémon details page first section', () => {
  it('has the correct url for the pokemon selected', () => {
    const dragonair = pokemons[8];
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${dragonair.id}`);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/148');
  });
  it('has the title for the pokemon selected', () => {
    const dragonair = pokemons[8];
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${dragonair.id}`);
    const pokeTitle = screen.getByText(`${dragonair.name} Details`);
    expect(pokeTitle).toBeInTheDocument();
  });
  it('hasn`t the link for more details', () => {
    const dragonair = pokemons[8];
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${dragonair.id}`);
    const links = screen.getAllByRole('link');
    links.forEach((link) => expect(link.innerHTML).not.toBe('More details'));
  });
  it('has the title for the Summary in the tag h2', () => {
    const dragonair = pokemons[8];
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${dragonair.id}`);
    const headings = screen.getAllByRole('heading', { level: 2 });
    const summaryTitle = headings.filter((heading) => heading.innerHTML === 'Summary');
    expect(summaryTitle[0]).toBeInTheDocument();
  });
  it('has the paragraph with the summary details', () => {
    const dragonair = pokemons[8];
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${dragonair.id}`);
    const paragraph = screen.getByText(dragonair.summary);
    expect(paragraph).toBeInTheDocument();
  });
});
describe('Tests if the pokémon details page second section section', () => {
  it('has the title for the locations where to find the pokémon', () => {
    const dragonair = pokemons[8];
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${dragonair.id}`);
    const headings = screen.getAllByRole('heading', { level: 2 });
    const text = `Game Locations of ${dragonair.name}`;
    const mapTitle = headings.filter((heading) => heading.innerHTML === text);
    expect(mapTitle[0]).toBeInTheDocument();
  });
  it('has all the locations where to find the pokémon', () => {
    const dragonair = pokemons[8];
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${dragonair.id}`);
    const locations = screen.getAllByAltText(`${dragonair.name} location`);
    expect(locations.length).toBe(dragonair.foundAt.length);
  });
  it('has all the locations images and text where to find the pokémon', () => {
    const dragonair = pokemons[8];
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${dragonair.id}`);
    const locationsImg = screen.getAllByAltText(`${dragonair.name} location`);
    expect(locationsImg.length).toBe(dragonair.foundAt.length);
    for (let index = 0; index < locationsImg.length; index += 1) {
      expect(locationsImg[index].src).toBe(dragonair.foundAt[index].map);
    }
    const locationsTextSource = [];
    dragonair.foundAt.forEach((place) => locationsTextSource.push(place.location));
    locationsTextSource.forEach((location) => {
      expect(screen.getByText(location)).toBeInTheDocument();
    });
  });
});
describe('Tests if the pokémon can be favorited on the pokémon details page', () => {
  it('has the checkbox to favorite the pokémon, with its text', () => {
    const dragonair = pokemons[8];
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${dragonair.id}`);
    const checkboxLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxLabel).toBeInTheDocument();
    const favCheckbox = screen.getByRole('checkbox');
    expect(favCheckbox).toBeInTheDocument();
  });
  it('add and removes correctly the pokémon from the favorites list', () => {
    const dragonair = pokemons[8];
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${dragonair.id}`);
    userEvent.click(screen.getByRole('checkbox'));
    const favImage = screen.getByAltText(/Dragonair is marked as favorite/);
    expect(favImage).toBeInTheDocument();
    userEvent.click(screen.getByRole('checkbox'));
    expect(favImage).not.toBeInTheDocument();
  });
});
