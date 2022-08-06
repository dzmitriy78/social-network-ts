import React from "react";
import cl from "./Header.module.css";
import {NavLink} from "react-router-dom";

export type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logout(): void
}

export const Header: React.FC<HeaderPropsType> = ({isAuth, logout, login}) => {
    return (
        <header className={cl.header}>
            <img src="https://previews.123rf.com/images/wavy28/wavy281605/wavy28160500900/59350543-hf-logo.jpg"
                 alt={""}/>
            <div className={cl.loginBlock}>
                {
                    isAuth
                        ? <div>{login}
                            <button onClick={logout}>Log out</button>
                        </div>
                        : <NavLink to={"/login"}>Login</NavLink>
                }
            </div>
        </header>
    )
}