import React from "react";
import {addDialogActionCreator, onDialogChangeActionCreator} from "../../redux/message-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {MessagePageType} from "../../redux/store";

let mapStateToProps = (state: { messagePage: MessagePageType }) => {
    return {
        messagePage: state.messagePage
    }
}
let mapDispatchToProps = (dispatch: (arg0: { type: string; newDialText?: string; }) => any) => {
    return {
        addDialog: () => dispatch(addDialogActionCreator()),
        onDialogChange: (dialogText: string) => dispatch(onDialogChangeActionCreator(dialogText))
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)