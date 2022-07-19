import React from "react";
import { Card } from "react-bootstrap";

export const CommentCard = ({ content, user, movie, date }) => {
    return (
        <Card className="mt-3">
            <Card.Header>
                {user.name} on {new Date(date).toLocaleString()} :: {movie}
            </Card.Header>
            <Card.Body>{content}</Card.Body>
        </Card>
    );
};
