import React, {createRef} from "react";
import classes from "./Dialogs.module.css"
import {NavLink} from "react-router-dom";
import {
    addDialogActionCreator,
    DialogsDataType,
    MessageDataType,
    MessagePageType,
    onDialogChangeActionCreator
} from "../../redux/state";

type newDialogsElement = string | null

export type DialogsType = {
    messagePage: MessagePageType
    dispatch: any
}

const Dialog = (props: DialogsDataType) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={classes.dialog}>
            <img src={props.avatar}/>i
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


    let newDialogsElement: React.RefObject<HTMLTextAreaElement>;
    newDialogsElement = createRef();
    let addDialog = () => {
        props.dispatch(addDialogActionCreator());
    }

    let onDialogChange = () => {

        // @ts-ignore
        let dialogText = newDialogsElement.current.value;
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
                    <textarea onChange={onDialogChange} ref={newDialogsElement}
                              value={props.messagePage.newDialogText}/>
                </div>
                <div>
                    <button onClick={addDialog}>Add post</button>
                </div>
            </div>
        </div>
    )
}