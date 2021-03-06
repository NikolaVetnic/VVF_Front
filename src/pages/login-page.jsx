import { Link } from "react-router-dom";
import LoginForm from "../components/forms/login-form";

const LoginPage = () => {
    return (
        <div>
            <LoginForm />
            <Link to="/register">Register new account</Link>
        </div>
    );
};

export default LoginPage;
