import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userDataSelector } from "../../store/auth/selectors";
import { postReaction } from "../../store/movie/actions";
import { selectedMovieSelector } from "../../store/movie/selectors";

export const ReactionsDisplay = ({ userId, movieId }) => {
    const dispatch = useDispatch();

    const authenticatedUser = useSelector(userDataSelector);
    const selectedMovie = useSelector(selectedMovieSelector);

    const handleLike = () => {
        dispatch(
            postReaction({
                userId: authenticatedUser.id,
                movieId: selectedMovie.id,
                reaction: "like",
            })
        );
    };

    const handleDislike = () => {
        dispatch(
            postReaction({
                userId: authenticatedUser.id,
                movieId: selectedMovie.id,
                reaction: "dislike",
            })
        );
    };

    return (
        <Container>
            <Row>
                <Col></Col>
                {/* ovde postoji problem ako koristim podatke iz store-a - ucitaju se tek nakon reload-a stranice */}
                <Col>
                    <Button variant="outline-primary" onClick={handleDislike}>
                        Dislike ({localStorage.getItem("selectedMovieDislikes")}
                        )
                    </Button>{" "}
                </Col>
                <Col>
                    <Button variant="outline-primary" onClick={handleLike}>
                        Like ({localStorage.getItem("selectedMovieLikes")})
                    </Button>{" "}
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};
