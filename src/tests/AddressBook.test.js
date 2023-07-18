import { render, screen, waitFor } from '@testing-library/react';
import AddressBook from '../components/AddressBook';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from "react-router-dom";
import {act} from "react-dom/test-utils";

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
                        large: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
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

        // Wait for the component to finish updating before asserting
        await waitFor(() => screen.findByText(/john doe/i));
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
                large: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
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
        mock.onGet('https://randomuser.me/api/?results=50').abortRequest();

        render(<AddressBook />);

        await screen.findByText(/request aborted/i);
    });


});
