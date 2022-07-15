import { Field } from "formik";
import React from "react";
import { Form, InputGroup } from "react-bootstrap";

function CustomFormTextArea({
    as,
    md,
    controlId,
    label,
    name,
    type,
    inputGroupPrepend,
}) {
    return (
        <Field name={name} component="textarea" rows="4">
            {({ field, form }) => {
                const isValid = !form.errors[field.name];
                const isInvalid = form.touched[field.name] && !isValid;
                return (
                    <Form.Group as={as} md={md} controlId={controlId}>
                        <Form.Label>{label}</Form.Label>
                        <InputGroup>
                            {inputGroupPrepend}
                            <Form.Control
                                {...field}
                                as="textarea"
                                rows={8}
                                type={type}
                                isValid={form.touched[field.name] && isValid}
                                isInvalid={isInvalid}
                                feedback={form.errors[field.name]}
                            />
                            <Form.Control.Feedback type="invalid">
                                {form.errors[field.name]}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                );
            }}
        </Field>
    );
}

export default CustomFormTextArea;
