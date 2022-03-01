import {myAPI} from "../api/api";

export const setAuthUserData = (userId: string, email: string, login: string) => ({
    type: "SET_USER_DATA",
    data: {userId, email, login}
});

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action: { type: string; data: { userId: string, email: string, login: string, isAuth: boolean }; }) => {

    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}

export const authMe = () => {
    return (dispatch: (arg0: { type: string; data: { userId: string; email: string; login: string; }; }) => void) => {
        myAPI.authMe()
            .then(data => {
                    if (data.resultCode === 0) {
                        let {id, email, login} = data.data;
                        dispatch(setAuthUserData(id, email, login));
                    }
                }
            )
    }
}

export default authReducer;
