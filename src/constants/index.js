export const DEFAULT_REGISTRATION_NAME = "John Doe";
export const DEFAULT_REGISTRATION_EMAIL = "john.doe@example.com";
export const DEFAULT_REGISTRATION_PASSWORD = "adMIN1234!";

export const DEFAULT_LOGIN_EMAIL = "quinten14@example.net";
export const DEFAULT_LOGIN_PASSWORD = "adMIN1234!";

export const MOVIE_GENRES = {
    comedy: "comedy",
    fantasy: "fantasy",
    scifi: "sci fi",
    horror: "horror",
    thriller: "thriller",
};

export const DEFAULT_MOVIE_TITLE = "Matrix";
export const DEFAULT_MOVIE_DESCRIPTION =
    "Thomas Anderson, a computer programmer, is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.";
export const DEFAULT_MOVIE_IMAGE_URL =
    "https://flxt.tmsimg.com/assets/p22804_p_v8_av.jpg";
export const DEFAULT_MOVIE_GENRE = MOVIE_GENRES.scifi;

export const DEFAULT_COMMENT = "Awesome movie!";
export const DEFAULT_STARTING_COMMENT_DISPLAY_NUM = 2;
export const DEFAULT_COMMENT_DISPLAY_INC = 1;

export const URL_REGEX = /\b(https?:\/\/\S*\b)/g;

export const MOVIE_PAGE_COL = 8;

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
            id: parseInt(localStorage.getItem("id"), 10),
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
        },
    },
};
