export const putAuthenticatedUser = (state, action) => ({
    ...state,
    current: action.payload,
});
