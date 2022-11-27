import * as React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {connect} from "react-redux";
import {initial} from "./redux/initial-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import MyErrorBoundary from './components/common/MyErrorBoundary';
import {Suspense, useEffect} from "react";
import {AppStateType} from "./redux/store";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const News = React.lazy(() => import( "./components/News/News"));
const Music = React.lazy(() => import("./components/Music/Music"));
const Settings = React.lazy(() => import( "./components/Settings/Settings"));
const ProfileContainer = React.lazy(() => import( "./components/Profile/ProfileContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const HeaderContainer = React.lazy(() => import( "./components/Header/HeaderContainer"));
const Login = React.lazy(() => import("./components/Login/Login"));
const Chat = React.lazy(()=> import("./components/Chat/Chat"))


const App: React.FC<AppPropsType> = ({initial, initialize}) => {
    useEffect(() => {
        initial()
    }, [initial])
    if (!initialize) {
        return <Preloader/>
    }
    return (
        <div className='app-wrapper'>
            <MyErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className={"app-wrapper-content"}>
                        <Routes>
                            <Route path="/" element={<Navigate to={'/profile'}/>}/>
                            <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                            <Route path="/profile/*" element={<ProfileContainer/>}/>
                            <Route path="/users/*" element={<UsersContainer/>}/>
                            <Route path="/chat/*" element={<Chat/>}/>
                            <Route path="/news/*" element={<News/>}/>
                            <Route path='/music/*' element={<Music/>}/>
                            <Route path="/settings/*" element={<Settings/>}/>
                            <Route path="/login/*" element={<Login/>}/>
                            <Route path="*" element={
                                <div style={{fontSize: 60}}>
                                    Page not found!
                                </div>
                            }/>
                        </Routes>
                    </div>
                </Suspense>
            </MyErrorBoundary>
        </div>
    );
}

function mapStateToProps(state: AppStateType) {
    return {
        initialize: state.initial.initialize
    }
}

export default connect(mapStateToProps, {initial})(App)

type AppPropsType = {
    initial: () => void
    initialize: boolean
}