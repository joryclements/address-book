// tests/App.test.js

import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App', () => {
    test('full app rendering/navigating', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );
    });

    test('navigates to settings page', async () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>
        );
        const settingsButton = screen.getByRole('link', { name: /Settings/i });
        fireEvent.click(settingsButton);

        // Verify that clicking the settings link navigates to the settings page
        expect(await screen.findByText(/Number of people/i)).toBeInTheDocument();




    });

    test('navigates to person detail page', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        // Click the first person in the list
        let personLink = await screen.findAllByRole('link', { name: /View Details/i });
        personLink = personLink[0];
        fireEvent.click(personLink);

        // Confirm new screen contents after navigation
        expect(await screen.findByText(/Back to Address Book/i)).toBeInTheDocument();
    });

});
