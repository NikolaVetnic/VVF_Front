import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Comments } from "../components/movies/comments";
import { ReactionsDisplay } from "../components/movies/reactions-display";
import { getComments } from "../store/movie/actions";
import { selectedMovieSelector } from "../store/movie/selectors";

export const MoviePage = () => {
    const dispatch = useDispatch();

    // for future reference
    const { id } = useParams();

    const { title, description, imageUrl, genre, num_visits } = useSelector(
        selectedMovieSelector
    );

    console.log(num_visits);

    useEffect(() => {
        dispatch(getComments(id));
    }, [dispatch, id]);

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

            <Row style={{ marginTop: "1rem" }}>
                <hr />
            </Row>

            <Row style={{ marginBottom: "1rem" }}>
                <span>{`Movie viewed ${num_visits} time(s)`}</span>
            </Row>

            <Row style={{ marginBottom: "1rem" }}>
                <ReactionsDisplay />
            </Row>

            <Row style={{ marginTop: "1rem" }}>
                <hr />
            </Row>

            <Row style={{ marginBottom: "2rem" }}>
                <Comments />
            </Row>
        </Container>
    );
};
