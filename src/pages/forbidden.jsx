import { Container, Row } from "react-bootstrap";

const ForbiddenPage = () => {
    return (
        <div>
            <Container>
                <Row className="p-3">
                    <h3>Forbidden</h3>
                    <p>Login to access the Welcome page.</p>
                </Row>
            </Container>
        </div>
    );
};

export default ForbiddenPage;
