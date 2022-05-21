import React from "react";
import classes from "./Dialogs.module.css"
import {Dialog} from "./Dialog/Dialog";
import PostForm, {FormikValues} from "../form/PostForm";
import {MessageDataType} from "../../redux/message-reducer";
import {MessagePageType} from "./DialogsContainer";

export type DialogsType = {
    messagePage: MessagePageType
    addDialog(dialogText: string): void
    isAuth: boolean
}

const Message: React.FC<MessageDataType> = (props) => {
    return (
        <div className={classes.message}>{props.message}</div>
    )
}

export const Dialogs:React.FC<DialogsType>=(props)=> {

    let state = props.messagePage;

    let dialogsElement = state.dialogsData
        .map((d, i) => <Dialog key={i} avatar={d.avatar} name={d.name} id={d.id}/>);

    let messageElement = state.messageData
        .map((m, i) => <Message key={i} id={m.id} message={m.message}/>);


    let addDialog = (values: FormikValues) => {
        props.addDialog(values.text);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={classes.messages}>
                {messageElement}
                <PostForm callback = {addDialog}/>
            </div>
        </div>
    )
}

