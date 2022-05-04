import {authMe} from "./auth-reducer";

const SET_INITIALISE = "SET-INITIALISE"
export const setInitialData = () => ({type: SET_INITIALISE})

let initialState = {
    initialize: false,
}

const initialReducer = (state = initialState, action: { type: string }) => {

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
