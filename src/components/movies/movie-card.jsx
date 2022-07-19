import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { incNumVisits, viewMovie } from "../../store/movie/actions";

const maxDescriptionLength = 150;

export const MovieCard = ({ movie }) => {
    const { id, title, description, image_url, genre } = movie;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(viewMovie(id));
        dispatch(incNumVisits(id));
        navigate(`/movie/${id}`);
    };

    return (
        <Card className="w-100">
            {/* ovde ne znam kako da preko Bootstrap klase zadam fiksnu visinu */}
            <Button variant="dark" onClick={handleClick}>
                <Card.Img
                    className="w-100"
                    variant="top"
                    src={image_url}
                    style={{ height: "24rem" }}
                />
            </Button>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{genre}</Card.Subtitle>
                <Card.Text>
                    {description.length > maxDescriptionLength
                        ? `${description.substring(0, maxDescriptionLength)}...`
                        : description}
                </Card.Text>
                <Button variant="primary" onClick={handleClick}>
                    Read More
                </Button>
            </Card.Body>
        </Card>
    );
};
