import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import CustomFormTextArea from "../custom-form-elements/custom-form-text-area";

import { DEFAULT_COMMENT } from "../../constants";
import { postComment } from "../../store/movie/actions";

const schema = yup.object({
    content: yup
        .string()
        .max(500, "Description cannot be longer than 250 characters")
        .required("Required"),
});

export default function CreateCommentForm({ user_id, movie_id }) {
    const dispatch = useDispatch();

    const handleCreateComment = (values) => {
        dispatch(postComment({ user_id, movie_id, content: values.content }));
    };

    return (
        <Card className="mt-3">
            <Card.Header>New Comment</Card.Header>
            <Card.Body>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, actions) => {
                        handleCreateComment(values);
                        actions.setSubmitting(false);
                        actions.resetForm({
                            values: {
                                content: "",
                            },
                        });
                    }}
                    initialValues={{
                        content: DEFAULT_COMMENT,
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
                            <Container>
                                <Row>
                                    <CustomFormTextArea
                                        label="Content"
                                        name="content"
                                        customRows="3"
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
                                            value="Post Comment"
                                            className="mt-3"
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    );
}
