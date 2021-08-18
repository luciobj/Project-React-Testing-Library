import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Tests if About page', () => {
  it('has an h2 tag with the text About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutTitle = screen.getByRole('heading', { level: 2 });
    expect(aboutTitle).toBeInTheDocument();
    expect(aboutTitle.innerHTML).toBe('About Pokédex');
  });
  it('has two paragraphs with pokédex text', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const firstP = screen.getByText(/This application simulates a Pokédex/);
    expect(firstP).toBeInTheDocument();
    const secondP = screen.getByText(/One can filter Pokémons by type/);
    expect(secondP).toBeInTheDocument();
  });
  it('has the predeterminated url as image source', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutImg = screen.getByRole('img');
    expect(aboutImg).toBeInTheDocument();
    expect(aboutImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
