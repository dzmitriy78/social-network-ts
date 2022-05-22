import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initial} from "./redux/initial-reducer";
import Preloader from "./components/common/Preloader/Preloader";

type AppPropsType = {
    initial: () => void
    initialize: boolean
}

const App: React.FC<AppPropsType> = ({initial, initialize}) => {
    useEffect(() => {
        initial()
        console.log("effect")
    }, [initial])
    if (!initialize) {
        return <Preloader/>

    }
    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className={"app-wrapper-content"}>
                <Routes>
                    <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                    <Route path="/profile/*" element={<ProfileContainer/>}/>
                    <Route path="/users/*" element={<UsersContainer/>}/>
                    <Route path="/news/*" element={<News/>}/>
                    <Route path='/music/*' element={<Music/>}/>
                    <Route path="/settings/*" element={<Settings/>}/>
                    <Route path="/login/*" element={<Login/>}/>
                </Routes>
            </div>
        </div>
    );
}

function mapStateToProps(state: { initial: { initialize: boolean; } }) {
    return {
        initialize: state.initial.initialize
    }
}

export default connect(mapStateToProps, {initial})(App);