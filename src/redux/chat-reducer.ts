import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import {chatAPI, ChatMessageType} from "../api/chatAPI";
import {Dispatch} from "redux";

const MESSAGES_RECEIVED = "chatReducer/MESSAGES-RECEIVED"
export const messagesReceived = (messages: ChatMessageType[]) => ({
    type: MESSAGES_RECEIVED,
    payload: {messages}
} as const)

let initialState = {
    messages: [] as ChatMessageType[]
}
const chatReducer = (state = initialState, action: InitialActionType): InitialStateType => {

    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state;
    }
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): ThunkType => async () => {
    chatAPI.sendMess(message)
}

export default chatReducer;


type InitialStateType = typeof initialState
type InitialActionType = ReturnType<typeof messagesReceived>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, InitialActionType>