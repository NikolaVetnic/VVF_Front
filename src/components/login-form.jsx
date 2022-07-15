import { Form, Formik } from "formik";
import { Button, Col, Container, Row } from "react-bootstrap";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import { putAuthenticatedUser } from "../store/auth/slice";
import authService from "../services/api/auth-service";
import CustomFormTextField from "./custom-form-text-field";
import {
    DEFAULT_LOGIN_EMAIL,
    DEFAULT_LOGIN_PASSWORD,
    INITIAL_MODAL_DATA,
} from "../constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomModal from "./custom-modal";
import * as authConstants from "../store/auth/constants";
import { testAuth } from "../store/auth/actions";

const schema = yup.object({
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup.string().required("Required"),
});

export default function LoginForm() {
    const [modalData, setModalData] = useState(INITIAL_MODAL_DATA);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (values) => {
        dispatch(testAuth(values.email));
        authService
            .login(values)
            .then((response) => {
                dispatch(putAuthenticatedUser(response));
                navigate("/profile");
            })
            .catch((error) => {
                const message = error.response.data.error;
                setModalData({
                    show: true,
                    title: "Error",
                    message: message,
                    buttonCaption: "Close",
                    onHide: () => {
                        setModalData(INITIAL_MODAL_DATA);
                    },
                });
            });
    };

    return (
        <Row>
            <Col>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values) => handleLogin(values)}
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

                                <CustomModal data={modalData} />
                            </Container>
                        </Form>
                    )}
                </Formik>
            </Col>
        </Row>
    );
}
