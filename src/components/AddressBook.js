// components/AddressBook.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';

function AddressBook() {
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedData = localStorage.getItem("persons");
        if (savedData) {
            setPersons(JSON.parse(savedData));
        } else {
            setLoading(true);
            axios.get('https://randomuser.me/api/?results=50')
                .then(response => {
                    setPersons(response.data.results);
                    setLoading(false);
                    localStorage.setItem("persons", JSON.stringify(response.data.results));
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
            });
        }
    }, []);

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Row xs={1} md={2} lg={4} className="g-4">
            {persons.map((person, index) => (
                <Col key={index}>
                    <Card className="h-100 shadow-sm">
                        <Card.Img variant="top" src={person.picture.large} />
                        <Card.Body>
                            <Card.Title>{person.name.first} {person.name.last}</Card.Title>
                            <Card.Text>{person.location.city}, {person.location.country}</Card.Text>
                            <Link className="btn btn-primary" to={`/person/${index}`}>View Details</Link>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default AddressBook;
