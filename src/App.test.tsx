import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Tale link', () => {
  render(<App />);
  const linkElement = screen.getByText("Chart configuration for Word export");
  expect(linkElement).toBeInTheDocument();
});
