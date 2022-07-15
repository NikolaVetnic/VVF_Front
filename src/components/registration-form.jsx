import { Form, Formik } from "formik";
import { Button, Col, Container, Row } from "react-bootstrap";
import * as yup from "yup";

import CustomFormTextField from "./custom-form-text-field";
import {
    DEFAULT_REGISTRATION_NAME,
    DEFAULT_REGISTRATION_EMAIL,
    DEFAULT_REGISTRATION_PASSWORD,
} from "../constants";
import { register } from "../store/auth/actions";
import { useDispatch } from "react-redux";

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
    const dispatch = useDispatch();

    const handleRegistration = (values, actions) => {
        dispatch(register({ ...values }));
        setTimeout(() => {
            actions.setSubmitting(false);
        }, 100);
    };

    return (
        <Row>
            <Col>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, actions) => {
                        handleRegistration(values);
                        actions.setSubmitting(false);
                    }}
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
                                        type="text"
                                    />
                                </Row>

                                <Row style={{ marginTop: "1rem" }}>
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
                                            value="Register"
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
