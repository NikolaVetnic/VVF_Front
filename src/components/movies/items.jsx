import { Col } from "react-bootstrap";
import { MovieCard } from "./movie-card";

export const Items = ({ movies }) => {
    if (movies === null) {
        return <></>;
    }

    return (
        <>
            {movies.map((movie) => {
                return (
                    <Col key={movie.id} className="mb-3">
                        <MovieCard movie={movie} />
                    </Col>
                );
            })}
        </>
    );
};
