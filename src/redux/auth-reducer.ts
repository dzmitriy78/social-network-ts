import {myAPI, securityAPI} from "../api/api";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";

const SET_USER_DATA = "authReducer/SET-USER-DATA"
const SET_CAPTCHA = "authReducer/SET-CAPTCHA"
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): AuthActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
}) as const
export const setCaptcha = (captchaUrl: string) => ({
    type: SET_CAPTCHA,
    payload: {captchaUrl}
}) as const

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
        case SET_CAPTCHA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const authMe = () => {
    return (dispatch: DispatchType) => {
        return myAPI.authMe()
            .then(data => {
                    if (data.resultCode === 0) {
                        let {id, email, login} = data.data
                        dispatch(setAuthUserData(id, email, login, true))
                    }
                }
            )
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string, setStatus: (status: string) => void): ThunkType => {
    return async (dispatch) => {
        let data = await myAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === 0) {
            await dispatch(authMe())
        } else {
            if (data.resultCode === 10) {
                await dispatch(getCaptcha())
            }
            setStatus(data.messages.join(" "))
        }
    }
}
export const logout = () => {
    return async (dispatch: DispatchType) => {
        let data = await myAPI.logout()
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}

export const getCaptcha = (): ThunkType => {
    return async (dispatch) => {
        const data = await securityAPI.captcha()
        dispatch(setCaptcha(data.url))
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
    isAuth: boolean
} | { captchaUrl: string | null }

export type AuthActionType = {
    type: typeof SET_USER_DATA | typeof SET_CAPTCHA,
    payload: AuthPayloadType
}

type DispatchType = Dispatch<AuthActionType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthActionType>
