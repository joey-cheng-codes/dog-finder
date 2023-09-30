import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('App tests', () => {
  it('should contains the heading 1', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>);
    const heading = screen.getByText(/Hello world! I am using React/i);
    expect(heading).toBeInTheDocument()
  });
});