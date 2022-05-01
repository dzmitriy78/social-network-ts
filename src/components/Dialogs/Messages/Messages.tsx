import React from "react";
import classes from "./../Dialogs.module.css"
import {MessageDataType} from "../../../redux/message-reducer";

type MessageType = {
    message: MessageDataType
}

export const Message = (props: MessageType) => {
    return (
        <div className={classes.message}>{props.message}</div>
    )
}
