import React from "react";
import classes from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

export const Navbar = ()=> {
    return (
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink className={(navData) =>navData.isActive ? classes.activeLink : ""} to = {"/profile"} >Profile</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink className={(navData) =>navData.isActive ? classes.activeLink : ""} to ={"/dialogs"} >Messages</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink className={(navData) =>navData.isActive ? classes.activeLink : ""} to ={"/news"} >News</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink className={(navData) =>navData.isActive ? classes.activeLink : ""} to={"/music"} >Music</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink className={(navData) =>navData.isActive ? classes.activeLink : ""} to={"/settings"} >Settings</NavLink>
            </div>
        </nav>

    )
}