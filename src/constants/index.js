export const DEFAULT_REGISTRATION_NAME = "John Doe";
export const DEFAULT_REGISTRATION_EMAIL = "john.doe@example.com";
export const DEFAULT_REGISTRATION_PASSWORD = "adMIN1234!";

export const DEFAULT_LOGIN_EMAIL = "lucas.douglas@example.org";
export const DEFAULT_LOGIN_PASSWORD = "adMIN1234!";

export const INITIAL_MODAL_DATA = {
    show: false,
    title: "",
    message: "",
    buttonCaption: "",
    onHide: () => {
        return;
    },
};

export const INITIAL_USER_DATA = {
    current: {
        token: localStorage.getItem("token"),
        data: {
            id: localStorage.getItem("id"),
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
        },
    },
};
