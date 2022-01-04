import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import strings from './strings';

describe('app start', () => {
  it('renders header and nav', () => {
    render(<App />);
    const header = screen.getByText(strings.appName);
    const navIdentities = screen.getByText(strings.navIdentities);
    const navChaincodes = screen.getByText(strings.navChaincodes);
    expect(header).toBeInTheDocument();
    expect(navIdentities).toBeInTheDocument();
    expect(navChaincodes).toBeInTheDocument();
  });
});
