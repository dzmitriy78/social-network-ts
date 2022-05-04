import {myAPI} from "../api/api";

const SET_USER_DATA = "SET-USER-DATA"
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    data: {userId, email, login, isAuth}
});

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action: { type: string; data: { userId: number, email: string, login: string, isAuth: boolean }; }) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state;
    }
}

export const authMe = () => {
    return (dispatch: (arg0: { data: { isAuth: boolean; login: string | null; userId: number | null; email: string | null }; type: string }) => void) => {
        return myAPI.authMe()
            .then(data => {
                    if (data.resultCode === 0) {
                        let {id, email, login} = data.data;
                        dispatch(setAuthUserData(id, email, login, true));
                    }
                }
            )
    }
}
export const login = (email: string, password: string, rememberMe: boolean, setStatus: (status: string) => void) => {
    return (dispatch: (arg0: (dispatch: (arg0: { data: { isAuth: boolean; login: string | null; userId: number | null; email: string | null }; type: string }) => void) => void) => void) => {
        myAPI.login(email, password, rememberMe)
            .then(data => {
                    if (data.resultCode === 0) {
                        dispatch(authMe());
                    } else {
                        setStatus(data.messages.join(" "))
                    }
                }
            )
    }
}
export const logout = () => {
    return (dispatch: (arg0: { type: string; data: { userId: number | null; email: string | null; login: string | null; isAuth: boolean; }; }) => void) => {
        myAPI.logout()
            .then(data => {
                    if (data.resultCode === 0) {
                        dispatch(setAuthUserData(null, null, null, false));
                    }
                }
            )
    }
}

export default authReducer;
