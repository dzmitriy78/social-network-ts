export const ADD_DIALOG = "ADD-DIALOG";
export const addDialogActionCreator = (dialogText: string) => ({type: ADD_DIALOG, dialogText})

let initialState = {
    dialogsData: [
        {id: 1, name: "Dim", avatar: "https://klike.net/uploads/posts/2019-03/1551511801_1.jpg"},
        {id: 2, name: "Andrew", avatar: "https://cdn.freelance.ru/images/att/1324133_900_600.png"},
        {id: 3, name: "John", avatar: "https://cs14.pikabu.ru/post_img/2021/05/08/12/1620504627134515650.jpg"},
        {
            id: 4,
            name: "Silver",
            avatar: "https://cs14.pikabu.ru/post_img/2021/05/08/12/1620504650176973363.webp"
        },
        {id: 5, name: "Pam", avatar: "https://cs13.pikabu.ru/post_img/2020/04/17/11/1587146536174888206.webp"},
        {
            id: 6,
            name: "Gucci",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZXiLIwZ4MJ4wim5PJAEv-8pjZR6omqL6qFw&usqp=CAU"
        },
    ],
    messageData: [
        {id: 1, message: "hi"},
        {id: 2, message: "Haw are you?"},
        {id: 3, message: "How do you do?"},
        {id: 4, message: "Yes"},
        {id: 5, message: "hi"},
        {id: 6, message: "hi"},
    ]
}

export type DialogsDataType = {
    id: number
    name: string
    avatar: string
}
export type MessageDataType = {
    id: number
    message: string
}
const messageReducer = (state: { dialogsData: DialogsDataType[]; messageData: MessageDataType[]; } = initialState,
                        action: { type: string; dialogText: string; }) => {
    switch (action.type) {
        case ADD_DIALOG:
            let newDialog = {
                id: 10,
                message: action.dialogText,
            }
            return {
                ...state,
                messageData: [...state.messageData, newDialog],
                newDialogText: ""
            }
        default:
            return state
    }
}
export default messageReducer;
