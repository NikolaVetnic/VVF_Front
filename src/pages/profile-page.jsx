import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProfilePage = () => {
    const currentUser = useSelector((state) => state.user.current);

    return (
        <div>
            <Container>
                <Row style={{ padding: "2rem" }}>
                    <h3>Welcome</h3>
                    <p>You are logged in as {currentUser.data.name}</p>
                </Row>
            </Container>
        </div>
    );
};

export default ProfilePage;
