import React from 'react';
import * as serviceWorker from './serviceWorker';
import {DialogsDataType, MessageDataType, PostDataType, Root_StateType, SideBar} from "./redux/store";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import store from "./redux/redux-store";

let rerenderTree = (state: any/*EmptyObject & { messagePage: { dialogsData?: DialogsDataType[]; newDialogText: string; messageData: MessageDataType[] }; sidebar: SideBar; profilePage: { postData: PostDataType[]; newPostText: string } }*/) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state}
                 dispatch={store.dispatch.bind(store)}/>
        </BrowserRouter>, document.getElementById('root'));
}

rerenderTree(store.getState());
store.subscribe(()=>{
    let state = store.getState();
    rerenderTree(state)
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
