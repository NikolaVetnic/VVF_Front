import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userDataSelector } from "../../store/auth/selectors";
import {
    addToFavorites,
    removeFromFavorites,
    updateFavorite,
} from "../../store/movie/actions";
import {
    favoritesByUserSelector,
    selectedMovieSelector,
} from "../../store/movie/selectors";

export const FavoriteDisplay = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatched, setIsWatched] = useState(false);

    const dispatch = useDispatch();

    const favoritesByUser = useSelector(favoritesByUserSelector);

    const authenticatedUser = useSelector(userDataSelector);
    const selectedMovie = useSelector(selectedMovieSelector);

    useEffect(() => {
        setIsFavorite(
            favoritesByUser
                .map((favorite) => favorite.movie_id)
                .filter((i) => i === selectedMovie.id).length === 1
        );
        setIsWatched(
            favoritesByUser
                .filter((favorite) => favorite.movie_id === selectedMovie.id)
                .filter((favorite) => favorite.watched === 1).length === 1
        );
    }, [favoritesByUser, selectedMovie]);

    const handleAddToFavorites = () => {
        if (isFavorite) {
            dispatch(
                removeFromFavorites({
                    userId: authenticatedUser.id,
                    movieId: selectedMovie.id,
                })
            );
        } else {
            dispatch(
                addToFavorites({
                    userId: authenticatedUser.id,
                    movieId: selectedMovie.id,
                    watched: false,
                })
            );
        }
    };

    const handleMarkAsWatched = () => {
        dispatch(
            updateFavorite({
                userId: authenticatedUser.id,
                movieId: selectedMovie.id,
            })
        );
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Button
                        variant={
                            isFavorite ? "outline-danger" : "outline-success"
                        }
                        onClick={handleAddToFavorites}
                    >
                        {isFavorite
                            ? "Remove from Favorites"
                            : "Add to Favorites"}
                    </Button>
                </Col>
                {isFavorite ? (
                    <Col>
                        <Button
                            variant={
                                isWatched ? "outline-danger" : "outline-success"
                            }
                            onClick={handleMarkAsWatched}
                        >
                            {isWatched
                                ? "Mark the movie as NOT watched"
                                : "Mark the movie as watched"}
                        </Button>
                    </Col>
                ) : (
                    <></>
                )}
            </Row>
        </Container>
    );
};
