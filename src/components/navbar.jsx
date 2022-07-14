import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { isExpired } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { save } from "../store/user/slice";
import userService from "../services/api/user-service";

function NavbarComponent() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.current);

    const handleLogout = () => {
        userService.logout().then(() => {
            dispatch(save({}));
            localStorage.clear();
        });
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" sticky="top">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>

                    {!isExpired(currentUser.token) ? (
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/profile">
                                Profile
                            </Nav.Link>
                        </Nav>
                    ) : (
                        <></>
                    )}
                    <Nav>
                        {isExpired(currentUser.token) ? (
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
