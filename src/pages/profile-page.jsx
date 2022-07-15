import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userDataSelector } from "../store/auth/selectors";

const ProfilePage = () => {
    const authenticatedUser = useSelector(userDataSelector);

    return (
        <div>
            <Container>
                <Row style={{ padding: "2rem" }}>
                    <h3>Welcome</h3>
                    <p>You are logged in as {authenticatedUser.name}</p>
                </Row>
            </Container>
        </div>
    );
};

export default ProfilePage;
