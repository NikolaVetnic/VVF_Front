import { Field } from "formik";
import React from "react";
import { Form } from "react-bootstrap";

function CustomFormDropdown({
    as,
    md,
    controlId,
    label,
    name,
    type,
    inputGroupPrepend,
    values,
    info,
}) {
    return (
        <Field className="form-control" as="select" name={name}>
            {({ field, form }) => {
                const isValid = !form.errors[field.name];
                const isInvalid = form.touched[field.name] && !isValid;
                return (
                    <Form.Group as={as} md={md} controlId={controlId}>
                        <Form.Label>{label}</Form.Label>
                        <Form.Select
                            {...field}
                            aria-label={label}
                            type={type}
                            isValid={form.touched[field.name] && isValid}
                            isInvalid={isInvalid}
                            feedback={form.errors[field.name]}
                        >
                            <option>{info}</option>
                            {Object.values(values).map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                );
            }}
        </Field>
    );
}

export default CustomFormDropdown;
