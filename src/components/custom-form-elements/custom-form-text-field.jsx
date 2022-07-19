import { Col } from "react-bootstrap";
import FormTextField from "./form-field";

const CustomFormTextField = ({ label, type, name, ...rest }) => {
    return (
        <FormTextField as={Col} sm="4" label={label} type={type} name={name} />
    );
};

export default CustomFormTextField;
