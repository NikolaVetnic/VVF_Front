import { Col } from "react-bootstrap";
import FormTextField from "./form-field";

const CustomFormTextField = (props) => {
    return (
        <FormTextField
            as={Col}
            sm="4"
            label={props.label}
            type={props.type}
            name={props.name}
        />
    );
};

export default CustomFormTextField;
