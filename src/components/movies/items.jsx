import { Col, Container, Row } from "react-bootstrap";
import { MovieCard } from "./movie-card";

export const Items = (props) => {
    const { movies, searchTerm, genreFilter } = props;

    // return (
    //     <>
    //         {movies
    // .filter((movie) =>
    //     searchTerm === ""
    //         ? true
    //         : movie.title
    //               .toLowerCase()
    //               .includes(searchTerm.toLowerCase())
    // )
    // .filter((movie) =>
    //     genreFilter === "all" ? true : movie.genre === genreFilter
    // )
    //             .map((movie, idx) => (
    // <Col key={idx}>
    //     <MovieCard
    //         id={movie.id}
    //         title={movie.title}
    //         description={movie.description}
    //         imageUrl={movie.imageUrl}
    //         genre={movie.genre}
    //     />
    // </Col>
    //             ))}
    //     </>
    // );

    if (movies === null) return <>BBB</>;
    else
        return (
            <>
                {movies
                    .filter((movie) =>
                        searchTerm === ""
                            ? true
                            : movie.title
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                    )
                    .filter((movie) =>
                        genreFilter === "all"
                            ? true
                            : movie.genre === genreFilter
                    )
                    .map((movie) => {
                        return (
                            <Col
                                key={movie.id}
                                style={{ marginBottom: "1rem" }}
                            >
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
