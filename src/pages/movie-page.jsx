import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Comments } from "../components/movies/comments";
import { FavoriteDisplay } from "../components/movies/favorite-display";
import { ReactionsDisplay } from "../components/movies/reactions-display";
import { MOVIE_PAGE_COL } from "../constants";
import { getComments } from "../store/movie/actions";
import {
    favoritesByUserSelector,
    selectedMovieSelector,
} from "../store/movie/selectors";

export const MoviePage = () => {
    const [isFavorite, setIsFavorite] = useState(false);

    const dispatch = useDispatch();

    // for future reference
    const { id } = useParams();

    const { title, description, imageUrl, genre, num_visits } = useSelector(
        selectedMovieSelector
    );

    const favoritesByUser = useSelector(favoritesByUserSelector);

    useEffect(() => {
        dispatch(getComments(id));
        setIsFavorite(
            favoritesByUser
                .map((favorite) => favorite.movie_id)
                .filter((i) => i == id).length
        );
    }, [dispatch, favoritesByUser, id]);

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
        </Container>
    );
};
