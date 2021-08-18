import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Tests About page', () => {
  it('redirects to NotFound if unknown path is typed', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatchTitle = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    expect(noMatchTitle).toBeInTheDocument();
    const noMatchGif = screen.getByAltText(/Pikachu crying because the page/);
    expect(noMatchGif).toBeInTheDocument();
    expect(noMatchGif.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');

    // Jeito alternativo levemente pior
    // const noMatchGif = screen.getAllByRole('img');
    // expect(noMatchGif[1]).toBeInTheDocument();
    // expect(noMatchGif[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
