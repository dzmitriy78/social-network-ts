import React from "react";
import classes from "./Dialogs.module.css"
import {NavLink} from "react-router-dom";
import {
    addDialogActionCreator,
    DialogsDataType,
    MessageDataType,
    MessagePageType,
    onDialogChangeActionCreator
} from "../../redux/state";

export type DialogsType = {
    messagePage: MessagePageType
    dispatch: any
}

const Dialog = (props: DialogsDataType) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={classes.dialog}>
            <img src={props.avatar} alt={""}/>
            <NavLink className={(DialogsData) => DialogsData.isActive ? classes.active : ""}
                     to={path}>{props.name}</NavLink>
        </div>
    )
}

const Message = (props: MessageDataType) => {
    return (
        <div className={classes.message}>{props.message}</div>
    )
}

export function Dialogs(props: DialogsType) {

    let dialogsElement = props.messagePage.dialogsData
        .map(d => <Dialog avatar={d.avatar} name={d.name} id={d.id}/>);

    let messageElement = props.messagePage.messageData
        .map(m => <Message id={m.id} message={m.message}/>);


    let addDialog = () => {
        props.dispatch(addDialogActionCreator());
    }

    let onDialogChange = (e: { target: { value: string; }; }) => {

        let dialogText = e.target.value;
        if (dialogText)
            props.dispatch(onDialogChangeActionCreator(dialogText));
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
                              value={props.messagePage.newDialogText}/>
                </div>
                <div>
                    <button disabled={props.messagePage.newDialogText === ""} onClick={addDialog}>Add post</button>
                </div>
            </div>
        </div>
    )
}