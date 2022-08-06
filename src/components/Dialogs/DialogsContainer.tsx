import {addDialog, DialogsDataType, MessageDataType} from "../../redux/message-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import React from "react";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {AppStateType} from "../../redux/store";

let mapStateToProps = (state: AppStateType) => {
    return {
        messagePage: state.messagePage
    }
}

const DialogsContainer = compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {addDialog}))
(Dialogs)
export default DialogsContainer

export type MessagePageType = {
    dialogsData: Array<DialogsDataType>
    messageData: Array<MessageDataType>
}
