import { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MovieSidebar from "../components/movies/movie-sidebar";
import { MovieList } from "../components/movies/movie-list";
import { userDataSelector } from "../store/auth/selectors";
import { getBestMovies } from "../store/movie/actions";
import { bestSelector } from "../store/movie/selectors";

const ProfilePage = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const authenticatedUser = useSelector(userDataSelector);
    const bestMovies = useSelector(bestSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBestMovies());
    }, [dispatch]);

    return (
        <div>
            <Container>
                <Row className="p-3">
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
                <MovieSidebar
                    show={showSidebar}
                    setShow={setShowSidebar}
                    title={"10 Best Liked Movies"}
                    movies={bestMovies}
                />
            ) : (
                <></>
            )}
        </div>
    );
};

export default ProfilePage;
