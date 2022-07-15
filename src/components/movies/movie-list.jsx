import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../store/movie/actions";
import { moviesSelector } from "../../store/movie/selectors";
import { MovieCard } from "./movie-card";

export const MovieList = () => {
    const dispatch = useDispatch();
    const movies = useSelector(moviesSelector);

    // dispatch(getMovies());

    useEffect(() => {
        dispatch(getMovies());
    }, []);
    // console.log(movies);

    if (movies !== undefined) {
        return (
            <div>
                <Row xs={1} md={3} className="g-4">
                    {movies.map((movie, idx) => (
                        <Col key={idx}>
                            <MovieCard
                                title={movie.title}
                                description={movie.description}
                                imageUrl={movie.imageUrl}
                                genre={movie.genre}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
};
