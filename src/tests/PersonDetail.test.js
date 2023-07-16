// tests/PersonDetail.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import PersonDetail from '../components/PersonDetail';

describe('PersonDetail', () => {
    test('renders without crashing', () => {
        render(
            <MemoryRouter initialEntries={['/person/0']}>
                <Routes>
                    <Route path="/person/:id" element={<PersonDetail/>} />
                </Routes>
            </MemoryRouter>
        );
    });

    test('displays person data when found', () => {
        localStorage.setItem("persons", JSON.stringify([{name: {first: 'John', last: 'Doe'}, location: {city: 'New York', country: 'USA'}, email: 'john.doe@example.com', phone: '+1 (123) 456-7890', picture: {large: ''}}]));

        render(
            <MemoryRouter initialEntries={['/person/0']}>
                <Routes>
                    <Route path="/person/:id" element={<PersonDetail/>} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/john doe/i)).toBeInTheDocument();
        expect(screen.getByText(/new york, usa/i)).toBeInTheDocument();
        expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
        expect(screen.getByText(/\+1 \(123\) 456-7890/i)).toBeInTheDocument();
    });

    test('displays error message when person data not found', () => {
        render(
            <MemoryRouter initialEntries={['/person/1000']}>
                <Routes>
                    <Route path="/person/:id" element={<PersonDetail/>} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/person not found/i)).toBeInTheDocument();
    });
});
