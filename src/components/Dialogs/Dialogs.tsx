import React from "react";
import classes from "./Dialogs.module.css"
import {Dialog} from "./Dialog/Dialog";
import PostForm, {FormikValues} from "../form/PostForm";
import {MessagePageType} from "./DialogsContainer";
import {Message} from "./Messages/Messages";


export const Dialogs: React.FC<DialogsType> = ({addDialog, messagePage}) => {

    let dialogsElement = messagePage.dialogsData
        .map((d, i) => <Dialog key={i} avatar={d.avatar} name={d.name} id={d.id}/>);

    let messageElement = messagePage.messageData
        .map((m, i) => <Message key={i} id={m.id} message={m.message}/>);


    let addNewDialog = (values: FormikValues) => {
        addDialog(values.text);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={classes.messages}>
                {messageElement}
                <PostForm callback={addNewDialog}/>
            </div>
        </div>
    )
}

export type DialogsType = {
    messagePage: MessagePageType
    addDialog(dialogText: string): void
}