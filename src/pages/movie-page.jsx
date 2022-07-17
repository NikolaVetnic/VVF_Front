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
import {
    favoritesByUserSelector,
    relatedMoviesSelector,
    selectedMovieSelector,
} from "../store/movie/selectors";

export const MoviePage = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const dispatch = useDispatch();

    // for future reference
    const { id } = useParams();

    const { title, description, imageUrl, genre, num_visits } = useSelector(
        selectedMovieSelector
    );

    const favoritesByUser = useSelector(favoritesByUserSelector);
    const relatedMovies = useSelector(relatedMoviesSelector);

    useEffect(() => {
        dispatch(getComments(id));

        // ostajao je zanr od prethodno pogledanog filma, tako da su 'related' naslovi pogresnog zanra
        setTimeout(() => {
            dispatch(getRelatedMovies(genre));
        }, "100");
    }, [dispatch, favoritesByUser, id, genre]);

    const paddingColumn = () => {
        return <Col xs={(12 - MOVIE_PAGE_COL) / 2}></Col>;
    };

    return (
        <Container>
            <Row>
                {paddingColumn()}
                <Col xs={MOVIE_PAGE_COL}>
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

                    <Row>
                        <Button
                            variant="primary"
                            onClick={() => setShowSidebar(!showSidebar)}
                        >
                            Show Related Movies
                        </Button>
                        <hr />
                    </Row>

                    <Row style={{ marginBottom: "1rem" }}>
                        <span>{`Movie viewed ${num_visits} time(s)`}</span>
                    </Row>

                    <Row style={{ marginBottom: "1rem" }}>
                        <ReactionsDisplay />
                    </Row>

                    <Row>
                        <FavoriteDisplay />
                    </Row>

                    <Row style={{ marginTop: "1rem" }}>
                        <hr />
                    </Row>

                    <Row style={{ marginBottom: "2rem" }}>
                        <Comments />
                    </Row>
                </Col>
                {paddingColumn()}
            </Row>

            {relatedMovies !== undefined ? (
                <MovieSidebar
                    show={showSidebar}
                    setShow={setShowSidebar}
                    title={"Show Related Movies"}
                    movies={relatedMovies}
                />
            ) : (
                <></>
            )}
        </Container>
    );
};
