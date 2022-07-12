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
        const user = await this.getUserDataByPassingTokenDirectly(token);

        const responseData = {
            token: token,
            me: user,
        };

        return responseData;
    };

    // for getting the user before the token is stored in the state
    getUserDataByPassingTokenDirectly = (token) =>
        this.getApiClient()
            .get(ENDPOINTS.USER_DATA, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then((response) => {
                return response.data;
            });

    getUserData = () => {
        return this.getApiClient().get(ENDPOINTS.USER_DATA);
    };
}

export default new UserService();
