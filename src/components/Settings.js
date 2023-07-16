// components/Settings.js

import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Alert, Container, Card, Row, Col } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

function Settings() {
    const [num, setNum] = useState('');
    const [newPerson, setNewPerson] = useState({
        name: { first: '', last: '' },
        location: { city: '', country: '' },
        email: '',
        phone: '',
        picture: {large: "" }
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchNewList = (e) => {
        e.preventDefault();
        axios.get(`https://randomuser.me/api/?results=${num}`)
            .then(response => {
                localStorage.setItem("persons", JSON.stringify(response.data.results));
                setSuccess('New list of people fetched successfully.');
                setError('');
            })
            .catch(error => {
                setError(`Failed to fetch new list of people. Error ${error.message}`);
                setSuccess('');
            });
    };

    const addPerson = (e) => {
        e.preventDefault();
        let persons = JSON.parse(localStorage.getItem("persons"));
        if (!persons) {
            persons = [];
        }
        persons.push({
            ...newPerson,
            picture: {
                large:
                    newPerson.picture.large ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            },
        });
        localStorage.setItem("persons", JSON.stringify(persons));
        setNewPerson({
            name: { first: "", last: "" },
            location: { city: "", country: "" },
            email: "",
            phone: "",
            picture: { large: "" },
        });
        setSuccess("New person added successfully.");
        setError("");
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Fetch New List</Card.Title>
                            <Form onSubmit={fetchNewList}>
                                <Form.Group controlId="formNum">
                                    <Form.Label>Number of People</Form.Label>
                                    <Form.Control type="number" placeholder="Enter number" value={num} onChange={(e) => setNum(e.target.value)} required/>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-3">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Add Person</Card.Title>
                            <Form onSubmit={addPerson}>
                                <Form.Group controlId="formFirstName" className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter first name" value={newPerson.name.first} onChange={(e) => setNewPerson({ ...newPerson, name: { ...newPerson.name, first: e.target.value } })} required />
                                </Form.Group>
                                <Form.Group controlId="formLastName" className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter last name" value={newPerson.name.last} onChange={(e) => setNewPerson({ ...newPerson, name: { ...newPerson.name, last: e.target.value } })} required />
                                </Form.Group>
                                <Form.Group controlId="formCity" className="mb-3">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" placeholder="Enter city" value={newPerson.location.city} onChange={(e) => setNewPerson({ ...newPerson, location: { ...newPerson.location, city: e.target.value } })} required/>
                                </Form.Group>
                                <Form.Group controlId="formCountry" className="mb-3">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="text" placeholder="Enter country" value={newPerson.location.country} onChange={(e) => setNewPerson({ ...newPerson, location: { ...newPerson.location, country: e.target.value } })} required />
                                </Form.Group>
                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={newPerson.email} onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })} required />
                                </Form.Group>
                                <Form.Group controlId="formPhone" className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <PhoneInput
                                        placeholder="Enter phone number"
                                        value={newPerson.phone}
                                        defaultCountry={"US"}
                                        onChange={(phone) => setNewPerson({ ...newPerson, phone })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPicture">
                                    <Form.Label>Picture</Form.Label>
                                    <Form.Control type="text" placeholder="Enter picture (optional)" value={newPerson.picture.large} onChange={(e) => setNewPerson({ ...newPerson, picture: { ...newPerson.picture, large: e.target.value } })} />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-3">
                                    Add Person
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Container>
    );
}

export default Settings;
