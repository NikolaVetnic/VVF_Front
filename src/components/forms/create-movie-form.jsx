import {
    Button,
    Col,
    Container,
    PlaceholderButton,
    Row,
} from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import CustomFormTextField from "../custom-form-elements/custom-form-text-field";
import CustomFormTextArea from "../custom-form-elements/custom-form-text-area";
import CustomFormDropdown from "../custom-form-elements/custom-form-dropdown";

import {
    DEFAULT_MOVIE_TITLE,
    DEFAULT_MOVIE_DESCRIPTION,
    DEFAULT_MOVIE_IMAGE_URL,
    URL_REGEX,
    MOVIE_GENRES,
} from "../../constants";
import { createMovie } from "../../store/movie/actions";
import { Component, useRef, useState } from "react";
import { OMDB_API_BASE_URL, OMDB_API_KEY } from "../../constants/api";
import movieService from "../../services/api/movie-service";

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
    image_url: yup
        .string()
        .matches(URL_REGEX, "Enter a valid url")
        .required("Required"),
    genre: yup.string(),
});

class Thumb extends Component {
    state = {
        loading: false,
        thumb: undefined,
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.file) {
            return;
        }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ loading: false, thumb: reader.result });
            };

            reader.readAsDataURL(nextProps.file);
        });
    }

    render() {
        const { file } = this.props;
        const { loading, thumb } = this.state;

        if (!file) {
            return null;
        }

        if (loading) {
            return <p>loading...</p>;
        }

        return (
            <img
                src={thumb}
                alt={file.name}
                className="img-thumbnail mt-2"
                height={200}
                width={200}
            />
        );
    }
}

export default function CreateMovieForm() {
    const dispatch = useDispatch();
    const formRef = useRef();

    const handleCreateMovie = (values) => {
        dispatch(createMovie({ ...values }));
    };

    const handleFetchFromOMDB = async (setFieldValue) => {
        const searchQuery = formRef.current.values.title
            .replace(" ", "+")
            .toLowerCase();
        await movieService.getDataFromOMDB(searchQuery).then((data) => {
            setFieldValue("title", data.Title);
            setFieldValue("description", data.Plot);
            setFieldValue("image_url", data.Poster);
        });
    };

    return (
        <Row>
            <Col>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, actions) => {
                        handleCreateMovie(values);
                        actions.setSubmitting(false);
                    }}
                    initialValues={{
                        title: DEFAULT_MOVIE_TITLE,
                        description: DEFAULT_MOVIE_DESCRIPTION,
                        image_url: DEFAULT_MOVIE_IMAGE_URL,
                        file: null,
                    }}
                    innerRef={formRef}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        errors,
                        isValid,
                        isSubmitting,
                        setFieldValue,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Container className="w-75">
                                <Row className="mt-5">
                                    <h2>Create Movie</h2>
                                </Row>

                                <Row className="mt-4">
                                    <CustomFormTextField
                                        label="Title"
                                        name="title"
                                        type="text"
                                    />
                                </Row>

                                <Row className="mt-4">
                                    <CustomFormTextArea
                                        label="Description"
                                        name="description"
                                    />
                                </Row>

                                <Row className="mt-4">
                                    <CustomFormTextField
                                        label="Image URL"
                                        name="image_url"
                                        type="text"
                                    />
                                </Row>

                                <Row>
                                    <input
                                        id="file"
                                        name="file"
                                        type="file"
                                        onChange={(e) => {
                                            const fileReader = new FileReader();
                                            fileReader.onload = () => {
                                                if (
                                                    fileReader.readyState === 2
                                                ) {
                                                    setFieldValue(
                                                        "file",
                                                        e.target.files[0]
                                                    );
                                                }
                                            };
                                            fileReader.readAsDataURL(
                                                e.target.files[0]
                                            );
                                        }}
                                    />
                                    {/*<Thumb file={values.file} />*/}
                                </Row>

                                <Row className="mt-4">
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
                                            className="mt-5 mb-5 w-75"
                                            disabled={!isValid || isSubmitting}
                                            variant="success"
                                            as="input"
                                            size="lg"
                                            type="submit"
                                            value="Create Movie"
                                        />
                                    </Col>
                                    <Col>
                                        <Button
                                            className="mt-5 mb-5 w-75"
                                            variant="primary"
                                            as="input"
                                            size="lg"
                                            type="button"
                                            value="Populate from OMDB"
                                            onClick={() =>
                                                handleFetchFromOMDB(
                                                    setFieldValue
                                                )
                                            }
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
