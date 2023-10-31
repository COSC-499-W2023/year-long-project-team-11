import React from "react";
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import CreateAccount from "./CreateAccount";

describe('<CreateAccount />', () => {
    beforeEach(() => {
        render(<CreateAccount />)
        spyLog = jest.spyOn(console, 'log').mockImplementation(() => { });
        spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => { });
    })

    afterEach(() => {
        spyLog.mockRestore();
        spyAlert.mockRestore();
    });

    test('renders without crashing', () => {
        const signUpHeading = screen.getByRole('heading', { name: /Sign Up/i });
        expect(signUpHeading).toBeInTheDocument();
    });

    test('shows an alert for SQL injection attempt', () => {
        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

        fireEvent.change(firstNameInput, { target: { value: "First" } })
        fireEvent.change(lastNameInput, { target: { value: "Last" } })
        fireEvent.change(emailInput, { target: { value: "test'; DROP TABLE users; --" } });
        fireEvent.change(passwordInput, { target: { value: "asdasd1@" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "asdasd1@" } });

        const submitButton = screen.getByRole('button', { name: /Sign Up/i });
        fireEvent.click(submitButton);

        expect(spyAlert).toHaveBeenCalledWith('Potential SQL injection detected!');
    });

    test('shows an error for invalid email format', () => {
        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

        fireEvent.change(firstNameInput, { target: { value: "First" } })
        fireEvent.change(lastNameInput, { target: { value: "Last" } })
        fireEvent.change(emailInput, { target: { value: "invalidEmail" } });
        fireEvent.change(passwordInput, { target: { value: "asdasd1@" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "asdasd1@" } });

        const submitButton = screen.getByRole('button', { name: /Sign Up/i });
        fireEvent.click(submitButton);

        expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });

    test('shows an error for short password', () => {
        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

        fireEvent.change(firstNameInput, { target: { value: "First" } })
        fireEvent.change(lastNameInput, { target: { value: "Last" } })
        fireEvent.change(emailInput, { target: { value: "test@email.com" } });
        fireEvent.change(passwordInput, { target: { value: "short" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "short" } });

        const submitButton = screen.getByRole('button', { name: /Sign Up/i });
        fireEvent.click(submitButton);

        expect(screen.getByText('Password is too short')).toBeInTheDocument();
    });

    test('shows an error when passwords do not match', () => {
        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

        fireEvent.change(firstNameInput, { target: { value: "First" } })
        fireEvent.change(lastNameInput, { target: { value: "Last" } })
        fireEvent.change(emailInput, { target: { value: "test@email.com" } });
        fireEvent.change(passwordInput, { target: { value: "ValidP@ss1" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "MismatchP@ss1" } });

        const submitButton = screen.getByRole('button', { name: /Sign Up/i });
        fireEvent.click(submitButton);

        expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });

    test('shows an error when password does not contain a number', () => {
        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
        const submitButton = screen.getByRole('button', { name: /Sign Up/i });

        fireEvent.change(firstNameInput, { target: { value: "First" } })
        fireEvent.change(lastNameInput, { target: { value: "Last" } })
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'ValidPass@' } }); // No number
        fireEvent.change(confirmPasswordInput, { target: { value: 'ValidPass@' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Password must contain at least one number and symbol')).toBeInTheDocument();
    });

    test('shows an error when password does not contain a symbol', () => {
        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
        const submitButton = screen.getByRole('button', { name: /Sign Up/i });

        fireEvent.change(firstNameInput, { target: { value: "First" } })
        fireEvent.change(lastNameInput, { target: { value: "Last" } })
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'ValidPass1' } }); // No symbol
        fireEvent.change(confirmPasswordInput, { target: { value: 'ValidPass1' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Password must contain at least one number and symbol')).toBeInTheDocument();
    });

    test('logs a successful form submission', () => {
        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

        fireEvent.change(firstNameInput, { target: { value: "First" } })
        fireEvent.change(lastNameInput, { target: { value: "Last" } })
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "ValidP@ss1" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "ValidP@ss1" } });

        const submitButton = screen.getByRole('button', { name: /Sign Up/i });
        fireEvent.click(submitButton);

        expect(spyLog).toHaveBeenCalledWith("Successfully created an account: test@example.com");
    });
})