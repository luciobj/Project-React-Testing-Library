import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Tests the App links', () => {
  it('has a Home link', () => {
    renderWithRouter(<App />);
    const linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();
  });
  it('has a About link', () => {
    renderWithRouter(<App />);
    const linkElement = screen.getByText(/About/i);
    expect(linkElement).toBeInTheDocument();
  });
  it('has a Favorite Pokemons link', () => {
    renderWithRouter(<App />);
    const linkElement = screen.getByText(/Favorite Pokémons/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe('Tests the App routes', () => {
  it('redirects to "/" after clicking on Home link', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const homeText = screen.getByText(/Encountered pokémons/);
    expect(homeText).toBeInTheDocument();
  });
  it('redirects to "/about" after clicking on About link', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutText = screen.getByText(/About Pokédex/);
    expect(aboutText).toBeInTheDocument();
  });
  it('redirects to "/favorites" after clicking on Favorite Pokémons link', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favoriteText = screen.getByText(/No favorite pokemon found/);
    expect(favoriteText).toBeInTheDocument();
  });
  it('redirects to NotFound if unknown path is typed', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = screen.getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
