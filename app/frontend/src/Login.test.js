import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Component', () => {

    beforeEach(() => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
    })

    test('Invalid email format inputted shows error message', () => {
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: /sign in/i });

        // Enter invalid email and valid password
        fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
        fireEvent.change(passwordInput, { target: { value: 'Pa$$word1' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });

    test('Invalid login credentials show error message', () => {
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: /sign in/i });

        // Enter valid email but incorrect password
        fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'IncorrectPassword' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Invalid email or password. Please try again.')).toBeInTheDocument();
    });

    test('Successful login does not show error messages', () => {
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: /sign in/i });

        // Enter valid email and password
        fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'Pa$$word1' } });
        fireEvent.click(submitButton);

        // Assert no error messages are displayed
        const errorMsg = screen.queryByText('Invalid email or password. Please try again.');
        expect(errorMsg).not.toBeInTheDocument();
        const emailError = screen.queryByText('Invalid email address');
        expect(emailError).not.toBeInTheDocument();
    });
});
