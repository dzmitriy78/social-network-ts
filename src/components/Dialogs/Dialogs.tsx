import React from "react";
import classes from "./Dialogs.module.css"
import {MessageDataType, MessagePageType} from "../../redux/store";
import {Dialog} from "./Dialog/Dialog";

export type DialogsType = {
    messagePage: MessagePageType
    addDialog(): void;
    onDialogChange(dialogText: string): void;
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
        .map(d => <Dialog key={d.name} avatar={d.avatar} name={d.name} id={d.id}/>);

    let messageElement = state.messageData
        .map((m,i )=> <Message key={i} id={m.id} message={m.message}/>);


    let addDialog = () => {
        props.addDialog();
    }

    let onDialogChange = (e: { target: { value: string; }; }) => {

        let dialogText = e.target.value;
        if (dialogText)
            props.onDialogChange(dialogText);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={classes.messages}>
                {messageElement}

                <div>
                    <textarea onChange={onDialogChange}
                              value={state.newDialogText}/>
                </div>
                <div>
                    <button className={classes.btn} disabled={state.newDialogText === ""} onClick={addDialog}>Add post
                    </button>
                </div>
            </div>
        </div>
    )
}