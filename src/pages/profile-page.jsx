import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProfilePage = () => {
    const authenticatedUser = useSelector((state) => state.auth.current);

    return (
        <div>
            <Container>
                <Row style={{ padding: "2rem" }}>
                    <h3>Welcome</h3>
                    <p>You are logged in as {authenticatedUser.data.name}</p>
                </Row>
            </Container>
        </div>
    );
};

export default ProfilePage;
