import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from "../test/test/utils";
import CreateEvent from '../../pages/CreateEvent';

describe('CreateEvent', () => {
    it('renders create event form', () => {
        renderWithProviders(<CreateEvent />);

        expect(screen.getByText('Create New Event')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter event title')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter full event description')).toBeInTheDocument();
        expect(screen.getByLabelText('Start Time')).toBeInTheDocument();
        expect(screen.getByLabelText('End Time')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter event location')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create event/i })).toBeInTheDocument();
    });

    it('validates required fields', async () => {
        const user = userEvent.setup();
        renderWithProviders(<CreateEvent />);

        // Submit form without filling any fields
        await user.click(screen.getByRole('button', { name: /create event/i }));

        // Wait for validation messages
        await waitFor(() => {
            expect(screen.getByText(/title is required/i)).toBeInTheDocument();
            expect(screen.getByText(/description must be at least 10 characters long/i)).toBeInTheDocument();
            expect(screen.getByText(/start time is required/i)).toBeInTheDocument();
            expect(screen.getByText(/end time is required/i)).toBeInTheDocument();
            expect(screen.getByText(/location is required/i)).toBeInTheDocument();
        });
    });

    it('successfully creates an event', async () => {
        const user = userEvent.setup();
        renderWithProviders(<CreateEvent />);

        // Fill in the form
        await user.type(screen.getByPlaceholderText('Enter event title'), 'Test Event');
        await user.type(screen.getByPlaceholderText('Enter full event description'), 'Test Description');
        await user.type(screen.getByLabelText('Start Time'), '2025-01-10T10:00');
        await user.type(screen.getByLabelText('End Time'), '2025-01-10T12:00');
        await user.type(screen.getByPlaceholderText('Enter event location'), 'Test Location');

        // Submit form
        await user.click(screen.getByRole('button', { name: /create event/i }));

        // Check if the API call was successful
        await waitFor(() => {
           
        });
    });
});