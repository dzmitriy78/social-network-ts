import React from "react";
import classes from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";


export const Dialog: React.FC<DialogType> = ({avatar, id, name}) => {
    let path = `/dialogs/${id}`;
    return (
        <div className={classes.dialog}>
            <img src={avatar} alt={""}/>
            <NavLink className={(DialogsData) => DialogsData.isActive ? classes.active : ""}
                     to={path}>{name}</NavLink>
        </div>
    )
}

export type DialogType = {
    id: number
    name: string
    avatar: string
}
