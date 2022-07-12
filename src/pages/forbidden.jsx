import { Container, Row } from "react-bootstrap";

const ForbiddenPage = () => {
    return (
        <div>
            <Container>
                <Row style={{ padding: "2rem" }}>
                    <h3>Forbidden</h3>
                    <p>Login to access the Welcome page.</p>
                </Row>
            </Container>
        </div>
    );
};

export default ForbiddenPage;
