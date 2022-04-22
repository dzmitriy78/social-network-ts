import React from "react";
import classes from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";

export type DialogType = {
    id: number
    name: string
    avatar: string
}

export const Dialog = (props: DialogType) => {
    let path = `/dialogs/${props.id}`;
    return (
        <div className={classes.dialog}>
            <img src={props.avatar} alt={""}/>
            <NavLink className={(DialogsData) => DialogsData.isActive ? classes.active : ""}
                     to={path}>{props.name}</NavLink>
        </div>
    )
}