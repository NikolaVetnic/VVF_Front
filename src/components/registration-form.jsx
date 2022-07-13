import { Form, Formik } from "formik";
import { Button, Col, Container, Row } from "react-bootstrap";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import CustomFormTextField from "./custom-form-text-field";
import {
    DEFAULT_REGISTRATION_NAME,
    DEFAULT_REGISTRATION_EMAIL,
    DEFAULT_REGISTRATION_PASSWORD,
} from "../constants";
import userService from "../services/api/user-service";
import { useState } from "react";
import CustomModal from "./custom-modal";

const schema = yup.object({
    name: yup
        .string()
        .min(3, "Name cannot be shorter than 3 characters")
        .max(50, "Name cannot be longer than 50 characters")
        .required("Required"),
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup.string().required("Required"),
});

export default function RegistrationForm() {
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();

    const handleRegistration = (values) => {
        userService.register(values).then((response) => {
            console.log(response);
            setModalShow(true);
        });
    };

    return (
        <Row>
            <Col>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values) => handleRegistration(values)}
                    initialValues={{
                        name: DEFAULT_REGISTRATION_NAME,
                        email: DEFAULT_REGISTRATION_EMAIL,
                        password: DEFAULT_REGISTRATION_PASSWORD,
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
                                    <h2>Register</h2>
                                </Row>

                                <Row style={{ marginTop: "2rem" }}>
                                    <CustomFormTextField
                                        label="Name"
                                        name="name"
                                    />
                                </Row>

                                <Row style={{ marginTop: "1rem" }}>
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

                                {/* ovde me interesuje kako mogu dinamicki da prosledim title i message npr. */}
                                <CustomModal
                                    data={{
                                        show: modalShow,
                                        title: "Registration Success",
                                        message:
                                            "You will now be redirected to Login form...",
                                        buttonCaption: "Close",
                                        onHide: function () {
                                            setModalShow(false);
                                            navigate("/login");
                                        },
                                    }}
                                />
                            </Container>
                        </Form>
                    )}
                </Formik>
            </Col>
        </Row>
    );
}
