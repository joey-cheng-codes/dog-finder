import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import Login from './Login';

describe('Login Component', () => {
  it('renders the Login component with form elements', () => {
    const { getByLabelText, getByText } = render(<Login />);
    const emailInput = getByLabelText('Email address');
    const nameInput = getByLabelText('Full Name');
    const signInButton = getByText('Sign in');

    // Assert that the form inputs and the sign in button are present
    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });
});