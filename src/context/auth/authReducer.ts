export const AUTH_ACTIONS = {
    login: 'Auth - Login',
    logout: 'Auth - Logout',
    validate: 'Auth - Validate',
}
export const USER_ACTIONS = {
    edit: 'User - Edit',
    color: 'User - Change color',
}
type Reducer = (
    state: any,
    action: any,
) => any;

export const authReducer: Reducer = (state, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.login:
            return {
                ...action.payload,
                logged: true,
            };

        case AUTH_ACTIONS.logout:
            return { ...action.payload.initialState, };

        case AUTH_ACTIONS.validate:
            return { ...action.payload };

        case USER_ACTIONS.edit:
            return { ...state, ...action.payload.user };

        case USER_ACTIONS.color:
            return { ...state, color: action.payload.color };

        default:
            return state;
    }
}