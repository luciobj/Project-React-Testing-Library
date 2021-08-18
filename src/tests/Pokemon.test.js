import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Tests if the pokémon card', () => {
  it('has a title with the text "Encountered pokémons"', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const title = screen.getByRole('heading', { level: 2, name: /Encountered pokémons/ });
    expect(title).toBeInTheDocument();
  });
});
