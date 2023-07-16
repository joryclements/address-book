import { render, screen } from '@testing-library/react';
import AddressBook from '../components/AddressBook';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {BrowserRouter} from "react-router-dom";

let mock = new MockAdapter(axios);

describe('AddressBook', () => {

    afterEach(() => {
        mock.reset();
        localStorage.clear();
    });

    test('renders without crashing', () => {
        render(<AddressBook />);
    });

    test('fetches a list of people when component is mounted', async () => {
        const fakeData = {
            results: [
                {
                    name: {
                        first: 'John',
                        last: 'Doe'
                    },
                    location: {
                        city: 'New York',
                        country: 'USA'
                    },
                    email: 'john.doe@example.com',
                    phone: '+1 (123) 456-7890',
                    picture: {
                        large: ''
                    }
                }
            ]
        };

        mock.onGet('https://randomuser.me/api/?results=50').reply(200, fakeData);

        render(
            <BrowserRouter>
                <AddressBook />
            </BrowserRouter>
        );

        await screen.findByText(/john doe/i);
        expect(localStorage.getItem("persons")).toBeTruthy();
    });

    test('displays a list of people', () => {
        const data = JSON.stringify([{
            name: {
                first: 'John',
                last: 'Doe'
            },
            location: {
                city: 'New York',
                country: 'USA'
            },
            email: 'john.doe@example.com',
            phone: '+1 (123) 456-7890',
            picture: {
                large: ''
            }
        }]);

        localStorage.setItem("persons", data);

        render(
            <BrowserRouter>
                <AddressBook />
            </BrowserRouter>
        );

        expect(screen.getByText(/john doe/i)).toBeInTheDocument();
        expect(screen.getByText(/new york, usa/i)).toBeInTheDocument();
    });

    test('displays error message when api call fails', async () => {
        mock.onGet('https://randomuser.me/api/?results=50').networkError();

        render(<AddressBook />);

        await screen.findByText(/network error/i);
    });
});
