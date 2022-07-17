import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { incNumVisits, selectMovie } from "../../store/movie/actions";

export const MovieSidebarButton = ({ movie }) => {
    const { id, title } = movie;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(selectMovie(id));
        dispatch(incNumVisits(id));
        navigate(`/movie/${id}`);
    };

    return (
        <div>
            <Button
                variant="outline-primary"
                onClick={handleClick}
                style={{ marginTop: "1rem", width: "23rem" }}
            >
                {title}
            </Button>
        </div>
    );
};
