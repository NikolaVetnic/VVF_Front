import HttpBaseClient from "../http-base-client";

const ENDPOINTS = {
    LOGIN: "api/auth/login/",
    USER_DATA: "/api/auth/me",
};

class UserService extends HttpBaseClient {
    login = async (credentials) => {
        const { data } = await this.getApiClient().post(
            ENDPOINTS.LOGIN,
            credentials
        );

        const token = `Bearer ${data.access_token}`;
        localStorage.setItem("token", token);

        const currentUser = await this.getUserData();
        const { id, name, email } = currentUser.data;
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

    getUserData = () => {
        return this.getApiClient().get(ENDPOINTS.USER_DATA);
    };
}

export default new UserService();
