import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BestMoviesButton } from "./best-movies-button";

const BestMoviesSidebar = ({ show, setShow, movies }) => {
    return (
        <>
            <Offcanvas show={show} onHide={setShow}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>10 Best Liked Movies</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {movies.map((movie) => (
                        <BestMoviesButton key={movie.id} movie={movie} />
                    ))}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default BestMoviesSidebar;
