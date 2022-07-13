import { Link } from "react-router-dom";
import RegisterForm from "../components/registration-form";

const RegisterPage = () => {
    return (
        <div>
            <RegisterForm />
            <Link to="/login">Sign In</Link>
        </div>
    );
};

export default RegisterPage;
