import { Form, Formik } from "formik";
import { Button, Col, Container, Row } from "react-bootstrap";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import { save } from "../features/user/user-slice";
import userService from "../services/api/user-service";
import CustomFormTextField from "./custom-form-text-field";
import { DEFAULT_EMAIL, DEFAULT_PASSWORD } from "../constants";

const schema = yup.object({
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup.string().required("Required"),
});

export default function LoginForm() {
    const dispatch = useDispatch();

    const handleLogin = (values) => {
        userService.login(values).then((response) => dispatch(save(response)));
    };

    return (
        <Row>
            <Col>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values) => handleLogin(values)}
                    initialValues={{
                        email: DEFAULT_EMAIL,
                        password: DEFAULT_PASSWORD,
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        errors,
                        isValid,
                        isSubmitting,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Container style={{ width: "50%" }}>
                                <Row style={{ marginTop: "2rem" }}>
                                    <h2>Login</h2>
                                </Row>

                                <Row style={{ marginTop: "2rem" }}>
                                    <CustomFormTextField
                                        label="Email"
                                        name="email"
                                    />
                                </Row>

                                <Row style={{ marginTop: "1rem" }}>
                                    <CustomFormTextField
                                        label="Password"
                                        name="password"
                                    />
                                </Row>

                                <Row>
                                    <Col>
                                        <Button
                                            disabled={!isValid || isSubmitting}
                                            variant="success"
                                            as="input"
                                            size="lg"
                                            type="submit"
                                            value="Submit"
                                            style={{
                                                width: "10rem",
                                                margin: "2rem",
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    )}
                </Formik>
            </Col>
        </Row>
    );
}
