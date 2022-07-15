import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { isExpired } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { putAuthenticatedUser } from "../store/auth/slice";
import authService from "../services/api/auth-service";
import { tokenSelector } from "../store/auth/selectors";

function NavbarComponent() {
    const dispatch = useDispatch();
    const token = useSelector(tokenSelector);

    const handleLogout = () => {
        authService.logout().then(() => {
            dispatch(putAuthenticatedUser({}));
            localStorage.clear();
        });
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" sticky="top">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>

                    {!isExpired(token) ? (
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/profile">
                                Profile
                            </Nav.Link>
                        </Nav>
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
