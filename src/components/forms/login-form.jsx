import { Button, Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import CustomFormTextField from "../custom-form-elements/custom-form-text-field";
import CustomModal from "../custom-modal";
import { login } from "../../store/auth/actions";
import { modalSelector } from "../../store/modal/selectors";

import { DEFAULT_LOGIN_EMAIL, DEFAULT_LOGIN_PASSWORD } from "../../constants";

const schema = yup.object({
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup.string().required("Required"),
});

export default function LoginForm() {
    const loginModal = useSelector(modalSelector);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (values) => {
        const { email, password } = values;

        dispatch(
            login({
                email,
                password,
                callback: () => navigate("/profile"),
            })
        );
    };

    return (
        <Row>
            <Col>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, actions) => {
                        handleLogin(values);
                        actions.setSubmitting(false);
                    }}
                    initialValues={{
                        email: DEFAULT_LOGIN_EMAIL,
                        password: DEFAULT_LOGIN_PASSWORD,
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
                                        type="email"
                                    />
                                </Row>

                                <Row style={{ marginTop: "1rem" }}>
                                    <CustomFormTextField
                                        label="Password"
                                        name="password"
                                        type="password"
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
                                            value="Login"
                                            style={{
                                                width: "10rem",
                                                margin: "2rem",
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <CustomModal data={loginModal} />
                            </Container>
                        </Form>
                    )}
                </Formik>
            </Col>
        </Row>
    );
}
