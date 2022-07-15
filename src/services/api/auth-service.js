import HttpBaseClient from "../http-base-client";

const ENDPOINTS = {
    LOGIN: "api/auth/login/",
    LOGOUT: "api/auth/logout",
    REGISTER: "api/auth/register",
    USER_DATA: "/api/auth/me",
};

class AuthService extends HttpBaseClient {
    login = async (credentials) => {
        const { data } = await this.getApiClient().post(
            ENDPOINTS.LOGIN,
            credentials
        );

        const token = data.access_token;
        localStorage.setItem("token", token);

        const authenticatedUser = await this.getUserData();
        const { id, name, email } = authenticatedUser.data;
        localStorage.setItem("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);

        const responseData = {
            token: token,
            data: {
                id,
                name,
                email,
            },
        };

        return responseData;
    };

    register = async (registrationData) => {
        const { name, email, password } = registrationData;

        const newUser = this.getApiClient()
            .post(ENDPOINTS.REGISTER, {
                name,
                email,
                password,
            })
            .then((response) => response.data);

        return newUser;
    };

    logout = () => {
        return this.getApiClient().post(ENDPOINTS.LOGOUT);
    };

    getUserData = () => {
        return this.getApiClient().get(ENDPOINTS.USER_DATA);
    };
}

export default new AuthService();