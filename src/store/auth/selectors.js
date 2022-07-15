const reducer = "auth";

export const tokenSelector = (state) => state[reducer].current.token;
export const userDataSelector = (state) => state[reducer].current.data;
