import { Form, Formik } from "formik";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import CustomFormTextField from "../custom-form-elements/custom-form-text-field";
import { register } from "../../store/auth/actions";

import {
    DEFAULT_REGISTRATION_NAME,
    DEFAULT_REGISTRATION_EMAIL,
    DEFAULT_REGISTRATION_PASSWORD,
} from "../../constants";

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

    const handleRegistration = (values) => {
        dispatch(register({ ...values }));
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
                            <Container className="w-50">
                                <Row className="mt-4">
                                    <h2>Register</h2>
                                </Row>

                                <Row className="mt-4">
                                    <CustomFormTextField
                                        label="Name"
                                        name="name"
                                        type="text"
                                    />
                                </Row>

                                <Row className="mt-3">
                                    <CustomFormTextField
                                        label="Email"
                                        name="email"
                                        type="email"
                                    />
                                </Row>

                                <Row className="mt-3">
                                    <CustomFormTextField
                                        label="Password"
                                        name="password"
                                        type="password"
                                    />
                                </Row>

                                <Row>
                                    <Col>
                                        <Button
                                            className="m-5 w-50"
                                            disabled={!isValid || isSubmitting}
                                            variant="success"
                                            as="input"
                                            size="lg"
                                            type="submit"
                                            value="Register"
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
