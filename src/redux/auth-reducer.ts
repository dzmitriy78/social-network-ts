import {myAPI} from "../api/api";

const SET_USER_DATA = "SET-USER-DATA"
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): authActionType => <authActionType>({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});

type initialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

type authPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean,
}

type authActionType =  {
    type: typeof SET_USER_DATA,
    payload: authPayloadType
}

let initialState: initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action: authActionType ): initialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const authMe = () => {
    return (dispatch: (arg0: authActionType) => void) => {
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
    return (dispatch: (arg0: (dispatch: (arg0: authActionType) => void) => Promise<void>) => void) => {
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
    return (dispatch: (arg0: authActionType) => void) => {
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
