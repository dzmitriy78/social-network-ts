import { DialogsDataType } from "./state";

export const addDialog = "ADD-DIALOG";
export const updateNewDialogText = "UPDATE-NEW-DIALOG-TEXT";
export const addDialogActionCreator = () => ({type: addDialog});
export const onDialogChangeActionCreator = (dialogText: string) => ({
    type: updateNewDialogText,
    newDialText: dialogText
});

const messageReducer = (state: { dialogsData?: DialogsDataType[]; newDialogText: string; messageData: any; },
                        action: { type: string; newText?: string; newDialText: string; }) => {
    switch (action.type) {
        case "ADD-DIALOG":
            let newDialog = {
                id: 10,
                message: state.newDialogText,
            }
            state.messageData.push(newDialog);
            state.newDialogText = "";
            break;
        case "UPDATE-NEW-DIALOG-TEXT":
            state.newDialogText = action.newDialText;
            break;
    }
    return state;
}
export default messageReducer;
