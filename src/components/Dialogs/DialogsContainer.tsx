import {addDialogActionCreator, onDialogChangeActionCreator} from "../../redux/message-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import React from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {MessagePageType} from "../../redux/store";
import {compose} from "redux";

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

export const DialogsContainer = compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps))
(Dialogs)
