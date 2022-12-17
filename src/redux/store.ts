import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import messageReducer from "./message-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import initialReducer from "./initial-reducer";
import chatReducer from "./chat-reducer";

let RootReducer = combineReducers(
    {
        profilePage: profileReducer,
        messagePage: messageReducer,
        usersPage: usersReducer,
        sidebar: sidebarReducer,
        auth: authReducer,
        initial: initialReducer,
        chat: chatReducer
    }
)

type RootReducerType = typeof RootReducer

export type AppStateType = ReturnType<RootReducerType>

let store = createStore(RootReducer, applyMiddleware(thunkMiddleware));

export default store;