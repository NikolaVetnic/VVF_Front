import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewMovie } from "../../store/movie/actions";

export const MovieSidebarButton = ({ movie }) => {
    // da li ovde mogu da se iscupaju ove promenljive direktno u zaglavlju metoda?
    const { id, title } = movie;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(viewMovie(id));
        navigate(`/movie/${id}`);
    };

    return (
        <div>
            <Button
                className="mt-4 w-100"
                variant="outline-primary"
                onClick={handleClick}
            >
                {title}
            </Button>
        </div>
    );
};
