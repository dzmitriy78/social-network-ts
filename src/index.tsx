import './index.css';

import {BrowserRouter} from "react-router-dom";
import store from "./redux/store";
import {Provider} from "react-redux";
import {createRoot} from 'react-dom/client';
import App from "./App";

let rerenderTree = () => {
    const root = createRoot(document.getElementById('root')!)
    root.render(
        <BrowserRouter  basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>);
}
rerenderTree();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA