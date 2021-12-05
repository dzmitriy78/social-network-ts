import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from "./components/Dialogs/Dialogs";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {Root_StateType} from "./redux/state";

type AppPropsType = {

    state: Root_StateType
    dispatch: (action: { type: string; newText: string; newDialText: string })=>void
}
const App = (props:AppPropsType) => {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className={"app-wrapper-content"}>
                <Routes>
                    <Route path="/dialogs/*" element={<Dialogs messagePage={props.state.messagePage}
                                                               dispatch={props.dispatch}/>}/>
                    <Route path='/profile/*' element={<Profile profilePage={props.state.profilePage}
                                                               dispatch={props.dispatch}/>}/>
                    <Route path="/news/*" element={<News/>}/>
                    <Route path='/music/*' element={<Music/>}/>
                    <Route path="/settings/*" element={<Settings/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;