import { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BestMoviesSidebar from "../components/movies/best-movies-sidebar";
import { MovieList } from "../components/movies/movie-list";
import { userDataSelector } from "../store/auth/selectors";
import { getBestMovies } from "../store/movie/actions";
import { bestMoviesSelector } from "../store/movie/selectors";

const ProfilePage = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const authenticatedUser = useSelector(userDataSelector);
    const bestMovies = useSelector(bestMoviesSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBestMovies());
    }, [dispatch]);

    return (
        <div>
            <Container>
                <Row style={{ padding: "2rem" }}>
                    <h3>Welcome</h3>
                    <p>You are logged in as {authenticatedUser.name}</p>
                    <hr />
                    <Button
                        variant="primary"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        Show 10 Best Liked Movies
                    </Button>
                    <hr />
                    <MovieList />
                </Row>
            </Container>

            {bestMovies !== undefined ? (
                <BestMoviesSidebar
                    show={showSidebar}
                    setShow={setShowSidebar}
                    movies={bestMovies}
                />
            ) : (
                <></>
            )}
        </div>
    );
};

export default ProfilePage;
