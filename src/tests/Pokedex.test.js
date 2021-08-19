import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const pokeName = 'pokemon-name';
const nextPoke = 'next-pokemon';
const selectTypeButtons = 'pokemon-type-button';
describe('Tests if the main page', () => {
  it('has a title with the text "Encountered pokémons"', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const title = screen.getByRole('heading', { level: 2, name: /Encountered pokémons/ });
    expect(title).toBeInTheDocument();
  });
  it('has a button for the next pokémon, with the text "Próximo pokémon"', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const nextButton = screen.getByTestId(nextPoke);
    expect(nextButton).toBeInTheDocument();
    expect(nextButton.innerHTML).toBe('Próximo pokémon');
  });
  it('has a button, that when clicked shows the next pokémon', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const typeButtons = screen.getAllByTestId(selectTypeButtons);
    userEvent.click(typeButtons[0]);
    const currentPokemonName = screen.getByTestId(pokeName);
    const name = 'Pikachu';
    expect(currentPokemonName.innerHTML).toBe(name);
    userEvent.click(screen.getByTestId(nextPoke));
    expect(currentPokemonName).not.toBe(name);
  });
  it('shows one pokémon only', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const typeButtons = screen.getAllByTestId(selectTypeButtons);
    userEvent.click(typeButtons[0]);
    userEvent.click(screen.getByTestId(nextPoke));
    const allPokemonName = screen.getAllByTestId(pokeName);
    expect(allPokemonName.length).toBe(1);
  });
  it('has a filter buttons, different from each other, and one for each type', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const typeButtons = screen.getAllByTestId(selectTypeButtons);
    const expectedButtons = 7;
    expect(typeButtons.length).toBe(expectedButtons);
    const pokeType = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    for (let index = 0; index < typeButtons.length; index += 1) {
      if (index === expectedButtons - 1) { break; }
      expect(typeButtons[index]).not.toBe(typeButtons[index + 1]);
      expect(pokeType).toContain(typeButtons[index].innerHTML);
    }
  });
  it('when a filter buttons is selected, only shows that type of pokémon', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const typeButtons = screen.getAllByTestId(selectTypeButtons);
    for (let index = 0; index < typeButtons; index += 1) {
      userEvent.click(typeButtons[index]);
      const currentType = typeButtons[index].innerHTML;
      const currentPokemonType = screen.getByTestId('pokemon-type');
      expect(currentType).toBe(currentPokemonType);
    }
  });
  it('has a "All" button and is selected when the page loads', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const typeButtons = screen.getAllByTestId(selectTypeButtons);
    userEvent.click(typeButtons[0]);
    expect(typeButtons[0]).toBeInTheDocument();
    const currentPokemonName = screen.getByTestId(pokeName);
    const name = 'Pikachu';
    expect(currentPokemonName.innerHTML).toBe(name);
    userEvent.click(screen.getByTestId('next-pokemon'));
    expect(currentPokemonName).not.toBe(name);
  });
  it('has a "All" button and it clears filters', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const typeButtons = screen.getAllByTestId(selectTypeButtons);
    userEvent.click(typeButtons[0]);
    userEvent.click(typeButtons[2]);
    userEvent.click(screen.getByTestId(''));
    const currentPokemonName = screen.getByTestId(pokeName);
    const name = 'Pikachu';
    expect(currentPokemonName.innerHTML).toBe(name);
    userEvent.click(screen.getByTestId(nextPoke));
    expect(currentPokemonName).not.toBe(name);
  });
});
