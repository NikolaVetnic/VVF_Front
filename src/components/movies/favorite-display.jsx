import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userDataSelector } from "../../store/auth/selectors";
import {
    addToFavorites,
    removeFromFavorites,
    updateFavorite,
} from "../../store/movie/actions";
import { favoritesSelector, viewedSelector } from "../../store/movie/selectors";

export const FavoriteDisplay = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatched, setIsWatched] = useState(false);

    const dispatch = useDispatch();

    const authenticatedUser = useSelector(userDataSelector);
    const viewed = useSelector(viewedSelector);
    const favorites = useSelector(favoritesSelector);

    useEffect(() => {
        setIsFavorite(
            favorites
                .map((favorite) => favorite.movie_id)
                .filter((i) => i === viewed.id).length === 1
        );
        setIsWatched(
            favorites
                .filter((favorite) => favorite.movie_id === viewed.id)
                .filter((favorite) => favorite.watched === 1).length === 1
        );
    }, [favorites, viewed]);

    const handleAddToFavorites = () => {
        if (isFavorite) {
            const { id } = favorites.find((fav) => fav.movie_id === viewed.id);
            dispatch(removeFromFavorites(id));
        } else {
            dispatch(
                addToFavorites({
                    user_id: authenticatedUser.id,
                    movie_id: viewed.id,
                    watched: false,
                })
            );
        }
    };

    const handleMarkAsWatched = () => {
        const { id } = favorites.find((fav) => fav.movie_id === viewed.id);
        dispatch(updateFavorite(id));
        setIsWatched(!isWatched);
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
