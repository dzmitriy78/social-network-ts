import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import messageReducer from "./message-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";



let RootReducer = combineReducers(
    {
        profilePage: profileReducer,
        messagePage: messageReducer,
        usersPage: usersReducer,
        sidebar: sidebarReducer,
        auth: authReducer
    }
)

let store = createStore(RootReducer, applyMiddleware(thunkMiddleware));

export default store;