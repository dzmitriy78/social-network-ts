import {addDialogActionCreator, DialogsDataType, MessageDataType} from "../../redux/message-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import React from "react";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

export type MessagePageType = {
    dialogsData: Array<DialogsDataType>
    newDialogText: string
    messageData: Array<MessageDataType>
}
let mapStateToProps = (state: { messagePage: MessagePageType }) => {
    return {
        messagePage: state.messagePage
    }
}
let mapDispatchToProps = (dispatch: (arg0: { type: string }) => any) => {
    return {
        addDialog: (dialogText: string) => dispatch(addDialogActionCreator(dialogText)),
    }
}

export const DialogsContainer = compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps))
(Dialogs)
