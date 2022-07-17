import { Col } from "react-bootstrap";
import { MovieCard } from "./movie-card";

export const Items = (props) => {
    const { movies } = props;

    if (movies === null) return <></>;
    else
        return (
            <>
                {movies.map((movie) => {
                    return (
                        <Col key={movie.id} style={{ marginBottom: "1rem" }}>
                            <MovieCard
                                id={movie.id}
                                title={movie.title}
                                description={movie.description}
                                imageUrl={movie.imageUrl}
                                genre={movie.genre}
                            />
                        </Col>
                    );
                })}
            </>
        );
};
