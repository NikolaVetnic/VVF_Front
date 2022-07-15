import React from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectedMovieSelector } from "../store/movie/selectors";

export const MoviePage = () => {
    const { id } = useParams();

    const { title, description, imageUrl, genre } = useSelector(
        selectedMovieSelector
    );

    return (
        <Container>
            <Row style={{ marginTop: "2rem" }}>
                <h1>{title}</h1>
            </Row>

            <Row style={{ marginTop: "1rem" }}>
                <img src={imageUrl} alt={title} />
            </Row>

            <Row style={{ marginTop: "1rem" }}>
                <h4>
                    <i>{genre}</i>
                </h4>
            </Row>

            <Row style={{ marginTop: "1rem" }}>
                <span>{description}</span>
            </Row>
        </Container>
    );
};
