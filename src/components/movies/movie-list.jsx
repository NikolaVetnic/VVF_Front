import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../store/movie/actions";
import { moviesSelector } from "../../store/movie/selectors";
import { MovieCard } from "./movie-card";

const timeToWaitBeforeSearching = 750;

export const MovieList = () => {
    const dispatch = useDispatch();
    const movies = useSelector(moviesSelector);
    const [inputValue, setInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearchTerm(inputValue);
        }, timeToWaitBeforeSearching);
        return () => clearTimeout(delayDebounceFn);
    }, [inputValue]);

    useEffect(() => {
        dispatch(getMovies());
    }, [dispatch]);

    if (movies !== undefined) {
        return (
            <div>
                <Row>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search movies by title"
                            className="me-2"
                            aria-label="Search"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </Form>
                </Row>
                <Row
                    xs={1}
                    md={3}
                    className="g-4"
                    style={{ marginTop: "0rem" }}
                >
                    {movies
                        .filter((movie) =>
                            searchTerm === ""
                                ? true
                                : movie.title
                                      .toLowerCase()
                                      .includes(searchTerm.toLowerCase())
                        )
                        .map((movie, idx) => (
                            <Col key={idx}>
                                <MovieCard
                                    id={movie.id}
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
