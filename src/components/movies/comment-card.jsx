import React from "react";
import { Card } from "react-bootstrap";

export const CommentCard = ({ content, user, date }) => {
    return (
        <Card style={{ margin: "1rem" }}>
            <Card.Header>
                {user.name} on {new Date(date).toLocaleString()}
            </Card.Header>
            <Card.Body>{content}</Card.Body>
        </Card>
    );
};
