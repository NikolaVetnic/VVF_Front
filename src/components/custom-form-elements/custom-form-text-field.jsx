import { Col } from "react-bootstrap";
import FormTextField from "./form-field";

const CustomFormTextField = (props) => {
    const { label, type, name, ...rest } = props;
    return (
        <FormTextField as={Col} sm="4" label={label} type={type} name={name} />
    );
};

export default CustomFormTextField;
