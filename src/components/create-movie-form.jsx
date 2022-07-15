import { Button, Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import CustomFormTextField from "./custom-form-text-field";
import CustomFormTextArea from "./custom-form-text-area";
import CustomFormDropdown from "./custom-form-dropdown";

import {
    DEFAULT_MOVIE_TITLE,
    DEFAULT_MOVIE_DESCRIPTION,
    DEFAULT_MOVIE_IMAGEURL,
    URL_REGEX,
    MOVIE_GENRES,
} from "../constants";
import { createMovie } from "../store/movie/actions";

const schema = yup.object({
    title: yup
        .string()
        .min(1, "Title cannot be shorter than 1 character")
        .max(50, "Title cannot be longer than 50 characters")
        .required("Required"),
    description: yup
        .string()
        .min(20, "Description cannot be shorter than 20 character")
        .max(250, "Description cannot be longer than 250 characters")
        .required("Required"),
    imageUrl: yup
        .string()
        .matches(URL_REGEX, "Enter a valid url")
        .required("Required"),
    genre: yup.string(),
});

export default function CreateMovieForm() {
    const dispatch = useDispatch();

    const handleCreateMovie = (values) => {
        dispatch(createMovie({ ...values }));
    };

    return (
        <Row>
            <Col>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, actions) => {
                        handleCreateMovie(values);
                        // actions.setSubmitting(false);
                    }}
                    initialValues={{
                        title: DEFAULT_MOVIE_TITLE,
                        description: DEFAULT_MOVIE_DESCRIPTION,
                        imageUrl: DEFAULT_MOVIE_IMAGEURL,
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
                                    <h2>Create Movie</h2>
                                </Row>

                                <Row style={{ marginTop: "2rem" }}>
                                    <CustomFormTextField
                                        label="Title"
                                        name="title"
                                        type="text"
                                    />
                                </Row>

                                <Row style={{ marginTop: "2rem" }}>
                                    <CustomFormTextArea
                                        label="Description"
                                        name="description"
                                    />
                                </Row>

                                <Row style={{ marginTop: "1rem" }}>
                                    <CustomFormTextField
                                        label="Image URL"
                                        name="imageUrl"
                                        type="text"
                                    />
                                </Row>

                                <Row style={{ marginTop: "1rem" }}>
                                    <CustomFormDropdown
                                        label="Genre"
                                        name="genre"
                                        values={MOVIE_GENRES}
                                        info="- select genre -"
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
                                            value="Create Movie"
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
