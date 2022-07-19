import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Comments } from "../components/movies/comments";
import { FavoriteDisplay } from "../components/movies/favorite-display";
import MovieSidebar from "../components/movies/movie-sidebar";
import { ReactionsDisplay } from "../components/movies/reactions-display";
import { MOVIE_PAGE_COL } from "../constants";
import { getComments, getRelatedMovies } from "../store/movie/actions";
import { relatedSelector, viewedSelector } from "../store/movie/selectors";

export const MoviePage = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const dispatch = useDispatch();

    // for future reference
    const { id } = useParams();

    const { title, description, image_url, genre, num_visits } =
        useSelector(viewedSelector);

    const related = useSelector(relatedSelector);

    useEffect(() => {
        dispatch(getComments(id));
        dispatch(getRelatedMovies(genre));
    }, [id, genre]);

    return (
        <Container fluid className="w-100">
            <Row className="justify-content-md-center">
                <Col xs={MOVIE_PAGE_COL}>
                    <Row className="mt-4">
                        <h1>{title}</h1>
                    </Row>

                    <Row className="mt-3">
                        <img src={image_url} alt={title} />
                    </Row>

                    <Row className="mt-3">
                        <h4>
                            <i>{genre}</i>
                        </h4>
                    </Row>

                    <Row className="mt-3">
                        <span>{description}</span>
                    </Row>

                    <Row className="mt-3">
                        <hr />
                    </Row>

                    <Row>
                        <Button
                            variant="primary"
                            onClick={() => setShowSidebar(!showSidebar)}
                        >
                            Show Related Movies
                        </Button>
                        <hr />
                    </Row>

                    <Row className="mt-3">
                        <span>{`Movie viewed ${num_visits} time(s)`}</span>
                    </Row>

                    <Row className="mt-3">
                        <ReactionsDisplay />
                    </Row>

                    <Row className="mt-3">
                        <FavoriteDisplay />
                    </Row>

                    <Row className="mt-3">
                        <hr />
                    </Row>

                    <Comments />
                </Col>
            </Row>

            {related !== undefined ? (
                <MovieSidebar
                    show={showSidebar}
                    setShow={setShowSidebar}
                    title={"Show Related Movies"}
                    movies={related}
                />
            ) : (
                <></>
            )}
        </Container>
    );
};
