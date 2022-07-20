import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { moviesSelector } from "../../store/movie/selectors";
import PaginatedItems from "./paginated-items";
import { userDataSelector } from "../../store/auth/selectors";

import { MOVIE_GENRES } from "../../constants";
import {
    getElasticSearchResults,
    getFavorites,
} from "../../store/movie/actions";

const timeToWaitBeforeSearching = 750;

export const MovieList = () => {
    const dispatch = useDispatch();

    const movies = useSelector(moviesSelector);
    const authenticatedUser = useSelector(userDataSelector);

    const [inputValue, setInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const [inputElasticValue, setInputElasticValue] = useState("");

    const [genreFilter, setGenreFilter] = useState("all");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearchTerm(inputValue);
        }, timeToWaitBeforeSearching);

        dispatch(getFavorites(authenticatedUser.id));

        return () => clearTimeout(delayDebounceFn);
    }, [authenticatedUser, dispatch, inputValue, inputElasticValue]);

    const handleElasticSearch = () => {
        console.log(inputElasticValue);
        dispatch(getElasticSearchResults(inputElasticValue));
    };

    if (movies !== undefined) {
        return (
            <div>
                <Row>
                    <Col>
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
                    </Col>
                    <Col xs={3}>
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                            >
                                &nbsp;Filter Movies by Genre&nbsp;
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item
                                    key={1}
                                    value="all"
                                    as="button"
                                    onClick={(e) =>
                                        setGenreFilter(e.target.value)
                                    }
                                >
                                    all
                                </Dropdown.Item>
                                {Object.values(MOVIE_GENRES).map(
                                    (item, idx) => (
                                        <Dropdown.Item
                                            key={idx + 1}
                                            value={item}
                                            as="button"
                                            onClick={(e) =>
                                                setGenreFilter(e.target.value)
                                            }
                                        >
                                            {item}
                                        </Dropdown.Item>
                                    )
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search movies by title (ElasticSearch)"
                                className="me-2"
                                aria-label="Elastic Search"
                                value={inputElasticValue}
                                onChange={(e) =>
                                    setInputElasticValue(e.target.value)
                                }
                            />
                            <Button
                                variant="primary"
                                as="input"
                                type="button"
                                value="Elastic Search"
                                onClick={() => handleElasticSearch()}
                            />
                        </Form>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <PaginatedItems
                        itemsPerPage={3}
                        searchTerm={searchTerm}
                        genreFilter={genreFilter}
                    />
                </Row>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
};
