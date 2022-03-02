import {addDialogActionCreator, onDialogChangeActionCreator} from "../../redux/message-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";

let mapStateToProps = (state: { messagePage: any; auth: { isAuth: boolean; }; }) => {
    return {
        messagePage: state.messagePage,
        isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch: (arg0: { type: string; newDialText?: string; }) => any) => {
    return {
        addDialog: () => dispatch(addDialogActionCreator()),
        onDialogChange: (dialogText: string) => dispatch(onDialogChangeActionCreator(dialogText))
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)