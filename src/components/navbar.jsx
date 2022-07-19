import Container from "react-bootstrap/Container";
import { isExpired } from "react-jwt";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";

import authService from "../services/api/auth-service";
import { putAuthenticatedUser } from "../store/auth/slice";
import { tokenSelector } from "../store/auth/selectors";
import { setModal } from "../store/modal/slice";
import { INITIAL_MODAL_DATA } from "../constants";
import {
    putFetchedMovies,
    selectMovie,
    selectComments,
    putFavorites,
    putBestMovies,
    putRelatedMovies,
} from "../store/movie/slice";

function NavbarComponent() {
    const dispatch = useDispatch();
    const token = useSelector(tokenSelector);

    const handleLogout = () => {
        authService.logout().then(() => {
            dispatch(putAuthenticatedUser({}));

            dispatch(setModal({}));

            dispatch(putFetchedMovies([]));
            dispatch(selectMovie({}));
            dispatch(putFavorites([]));
            dispatch(selectComments([]));
            dispatch(putBestMovies([]));
            dispatch(putRelatedMovies([]));

            localStorage.clear();
        });
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" sticky="top">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>

                    {!isExpired(token) ? (
                        <>
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/profile">
                                    Profile
                                </Nav.Link>
                                <Nav.Link as={Link} to="/movies/create">
                                    Create Movie
                                </Nav.Link>
                            </Nav>
                        </>
                    ) : (
                        <></>
                    )}
                    <Nav>
                        {isExpired(token) ? (
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                        ) : (
                            <Nav.Link
                                as={Link}
                                to="/login"
                                onClick={() => handleLogout()}
                            >
                                Logout
                            </Nav.Link>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComponent;
