import React from "react";
import { Button, Card } from "react-bootstrap";

const maxDescriptionLength = 150;

export const MovieCard = (props) => {
    const { title, description, imageUrl, genre } = props;
    return (
        <Card style={{ width: "18rem" }}>
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
                <Button variant="primary">Read More</Button>
            </Card.Body>
        </Card>
    );
};
