import {authMe} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";

const SET_INITIALISE = "initialReducer/SET-INITIALISE"
export const setInitialData = (): InitialActionType => ({type: SET_INITIALISE})


const initialReducer = (state = initialState, action: InitialActionType): InitialStateType => {

    switch (action.type) {
        case SET_INITIALISE:
            return {
                ...state,
                initialize: true
            }
        default:
            return state;
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, InitialActionType>

export const initial = (): ThunkType => async (dispatch) => {
    let promise = dispatch(authMe())
    await Promise.all([promise])
    dispatch(setInitialData())
}

export default initialReducer;


type InitialStateType = {
    initialize: boolean
}

let initialState: InitialStateType = {
    initialize: false
}

type InitialActionType = {
    type: typeof SET_INITIALISE
}
