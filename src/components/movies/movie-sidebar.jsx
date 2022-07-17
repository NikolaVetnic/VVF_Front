import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MovieSidebarButton } from "./movie-sidebar-button";

const MovieSidebar = ({ show, setShow, title, movies }) => {
    return (
        <>
            <Offcanvas show={show} onHide={setShow}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {movies.map((movie) => (
                        <MovieSidebarButton key={movie.id} movie={movie} />
                    ))}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default MovieSidebar;
