import {myAPI} from "../api/api";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";

const SET_USER_DATA = "authReducer/SET-USER-DATA"
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): AuthActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action: AuthActionType): InitialStateType => {

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
    return (dispatch: DispatchType) => {
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
export const login = (email: string, password: string, rememberMe: boolean, setStatus: (status: string) => void): ThunkType => {
    return async (dispatch) => {
        let data = await myAPI.login(email, password, rememberMe)
        data.resultCode === 0 ?
            await dispatch(authMe())
            : setStatus(data.messages.join(" "))
    }
}
export const logout = () => {
    return async (dispatch: DispatchType) => {
        let data = await myAPI.logout()
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export default authReducer;

type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

type AuthPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean,
}

export type AuthActionType = {
    type: typeof SET_USER_DATA,
    payload: AuthPayloadType
}

type DispatchType = Dispatch<AuthActionType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthActionType>
