import { Col } from "react-bootstrap";
import FormTextField from "./form-field";

const LoginFormTextField = (props) => {
    return (
        <FormTextField
            as={Col}
            sm="4"
            label={props.label}
            type="text"
            name={props.name}
        />
    );
};

export default LoginFormTextField;
