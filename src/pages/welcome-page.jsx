import { Container, Row } from "react-bootstrap";
import store from "../app/store";

const WelcomePage = () => {
    const current = store.getState().user.current;
    return (
        <div>
            <Container>
                <Row style={{ padding: "2rem" }}>
                    <h3>Welcome</h3>
                    <p>You are logged in as {current.data.name}</p>
                </Row>
            </Container>
        </div>
    );
};

export default WelcomePage;
