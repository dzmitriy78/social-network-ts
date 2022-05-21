import {authMe} from "./auth-reducer";

const SET_INITIALISE = "SET-INITIALISE"
export const setInitialData = (): initialActionType => ({type: SET_INITIALISE})

type initialStateType = {
    initialize: boolean
}

let initialState: initialStateType = {
    initialize: false
}

type initialActionType = {
    type: typeof SET_INITIALISE
}

const initialReducer = (state = initialState, action: initialActionType): initialStateType => {

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

export const initial = () => (dispatch: any) => {
    let promise = dispatch(authMe())
    Promise.all([promise])
        .then(() => {
                dispatch(setInitialData())
            }
        )
}

export default initialReducer;
