// components/PersonDetail.js

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Spinner, Alert } from 'react-bootstrap';

function PersonDetail() {
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        const savedPersons = JSON.parse(localStorage.getItem("persons"));
        if (savedPersons && savedPersons[id]) {
            setPerson(savedPersons[id]);
            setLoading(false);
        } else {
            setError("Person not found");
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (!person) return null;

    return (
        <div>
            <Card className="shadow-sm">
                <Card.Body>
                    <div className="d-flex align-items-center">
                        <Card.Img variant="top" src={person.picture.large} style={{width: '150px'}} className="me-4" />
                        <div>
                            <Card.Title>{person.name.first} {person.name.last}</Card.Title>
                            <Card.Text>
                                <strong>Phone:</strong> {person.phone} <br />
                                <strong>Email:</strong> {person.email} <br />
                                <strong>Location:</strong> {person.location.city}, {person.location.country}
                            </Card.Text>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <Link to="/" className="btn btn-primary mt-3">Back to Address Book</Link>
        </div>
    );
}

export default PersonDetail;
