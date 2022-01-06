import React from "react";
import {addDialogActionCreator, onDialogChangeActionCreator} from "../../redux/message-reducer";
import {Dialogs} from "./Dialogs";

export function DialogsContainer(props: any) {
    let state = props.store.getState()
    let addDialog = () => {
        props.store.dispatch(addDialogActionCreator());
    }

    let onDialogChange = (dialogText: string) => {
        props.store.dispatch(onDialogChangeActionCreator(dialogText));
    }

    return (
        <Dialogs addDialogActionCreator={addDialog}
                 onDialogChangeActionCreator={onDialogChange}
                 newDialogText={state.messagePage.newDialogText}
                 messagePage={state.messagePage}/>
    )
}
