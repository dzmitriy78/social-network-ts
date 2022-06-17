import React from "react";
import classes from "./../Dialogs.module.css"
import {MessageDataType} from "../../../redux/message-reducer";

export const Message: React.FC<MessageDataType> = ({message}) => {
    return (
        <div className={classes.message}>{message}</div>
    )
}
