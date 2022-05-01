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

const Message = (props: MessageDataType) => {
    return (
        <div className={classes.message}>{props.message}</div>
    )
}

export function Dialogs(props: DialogsType) {

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
                {/*<div>
                    <textarea onChange={onDialogChange}
                              value={state.newDialogText}/>
                </div>
                <div>
                    <button className={classes.btn} disabled={state.newDialogText === ""} onClick={addDialog}>Add post
                    </button>
                </div>*/}
            </div>
        </div>
    )
}

