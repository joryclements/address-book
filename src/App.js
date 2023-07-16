import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import AddressBook from './components/AddressBook';
import PersonDetail from './components/PersonDetail';
import Settings from './components/Settings';

function App() {
    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand href="/">Address Book</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/" className="btn btn-primary">Home</Link>
                            <Link to={"/settings"} className="btn btn-primary">Settings</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="my-4">
                <Routes>
                    <Route path="/person/:id" element={<PersonDetail />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/" element={<AddressBook />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
