import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { incNumVisits, selectMovie } from "../../store/movie/actions";

const maxDescriptionLength = 150;

export const MovieCard = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id, title, description, imageUrl, genre } = props;

    const handleClick = () => {
        console.log("My ID : " + id);
        dispatch(selectMovie(id));
        dispatch(incNumVisits(id));
        navigate(`/movie/${id}`);
    };

    return (
        <Card style={{ width: "17rem" }}>
            <Card.Img
                variant="top"
                src={imageUrl}
                style={{ width: "100%", height: "24rem" }}
            />
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
