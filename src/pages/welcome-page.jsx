import { Container, Row } from "react-bootstrap";
import store from "../app/store";

const WelcomePage = () => {
    const data = store.getState().user.data;
    return (
        <div>
            <Container>
                <Row style={{ padding: "2rem" }}>
                    <h3>Welcome</h3>
                    <p>You are logged in as {data.me.email}</p>
                </Row>
            </Container>
        </div>
    );
};

export default WelcomePage;
