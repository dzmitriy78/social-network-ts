import './index.css';
import {BrowserRouter} from "react-router-dom";
import store from "./redux/store";
import {Provider} from "react-redux";
import {createRoot, Root} from 'react-dom/client';
import App from "./App";

let root: Root = createRoot(document.getElementById('root')!);
root.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>)