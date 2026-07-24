import { render, screen } from '@testing-library/react';
import App from './App';

test('shows the MJ loading screen on initial render', () => {
  render(<App />);
  const loadingMark = screen.getAllByText(/M|J/i);
  expect(loadingMark.length).toBeGreaterThan(0);
});
