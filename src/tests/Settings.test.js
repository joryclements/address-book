// tests/Settings.test.js

import { render, fireEvent, screen } from '@testing-library/react';
import Settings from '../components/Settings';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let mock = new MockAdapter(axios);

describe('Settings', () => {
    test('renders without crashing', () => {
        render(<Settings />);
    });

    test('fetches a new list of people when form is submitted', async () => {
        render(<Settings />);
        const input = screen.getByLabelText(/number of people/i);
        fireEvent.change(input, { target: { value: '2' } });

        mock.onGet('https://randomuser.me/api/?results=2').reply(200, {
            data: { results: [{}] },
        });

        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await screen.findByText('New list of people fetched successfully.');
        expect(localStorage.getItem("persons")).toBeTruthy();
    });

    test('renders error message when api call fails', async () => {
        render(<Settings />);
        const input = screen.getByLabelText(/number of people/i);
        fireEvent.change(input, { target: { value: '2' } });

        mock.onGet('https://randomuser.me/api/?results=2').networkError();

        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        await screen.findByText(/failed to fetch new list of people/i);

    });
});
