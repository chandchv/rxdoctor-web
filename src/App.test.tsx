import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders RxDoctor header', () => {
  render(<App />);
  const logoElement = screen.getByText(/RxDoctor/i);
  expect(logoElement).toBeInTheDocument();
});

test('renders main headline', () => {
  render(<App />);
  const headlineElement = screen.getByText(/Complete Healthcare/i);
  expect(headlineElement).toBeInTheDocument();
});
