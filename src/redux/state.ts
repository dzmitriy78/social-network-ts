export type MessageDataType = {
    id: number
    message: string
}
export type DialogsDataType = {
    id: string
    name: string
    avatar: any
}

export type PostDataType = {
    id: number
    message: string
    likeCount: number
}
export type ProfilePageType = {
    postData: Array<PostDataType>
    newPostText: string
}
export type MessagePageType = {
    dialogsData: Array<DialogsDataType>
    newDialogText: string
    messageData: Array<MessageDataType>
}
export type SideBar = {}
export type Root_StateType = {
    profilePage: ProfilePageType
    messagePage: MessagePageType
    sideBar: SideBar
}
export type GlobalStoreType = {
    _state: Root_StateType
    _callSubscriber: any
    getState: any
    subscriber:any
    dispatch: any
}

const addPost = "ADD-POST";
const updateNewPostText = "UPDATE-NEW-POST-TEXT";
const addDialog = "ADD-DIALOG";
const updateNewDialogText = "UPDATE-NEW-DIALOG-TEXT";

export const addPostActionCreator = () => ({type: addPost});
export const updatePostActionCreator = (text: string) => ({type: updateNewPostText, newText: text})
export const addDialogActionCreator = () => ({type: addDialog});
export const onDialogChangeActionCreator = (dialogText: string) => ({type: updateNewDialogText, newDialText: dialogText});

let store: GlobalStoreType = {
    _state: {
        profilePage: {
            postData: [
                {id: 1, message: "Hi, how are you", likeCount: 15},
                {id: 2, message: "It's my first post", likeCount: 25},
                {id: 3, message: "Hi", likeCount: 1},
            ],
            newPostText: "",
        },

        messagePage: {
            dialogsData: [
                {id: 1, name: "Dim", avatar: "https://klike.net/uploads/posts/2019-03/1551511801_1.jpg"},
                {id: 2, name: "Andrew", avatar: "https://cdn.freelance.ru/images/att/1324133_900_600.png"},
                {id: 3, name: "John", avatar:"https://cs14.pikabu.ru/post_img/2021/05/08/12/1620504627134515650.jpg"},
                {id: 4, name: "Silver", avatar: "https://cs14.pikabu.ru/post_img/2021/05/08/12/1620504650176973363.webp"},
                {id: 5, name: "Pam", avatar: "https://cs13.pikabu.ru/post_img/2020/04/17/11/1587146536174888206.webp"},
                {id: 6, name: "Gucci", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZXiLIwZ4MJ4wim5PJAEv-8pjZR6omqL6qFw&usqp=CAU"},
            ],
            messageData: [
                {id: 1, message: "hi"},
                {id: 2, message: "Haw are you?"},
                {id: 3, message: "How do you do?"},
                {id: 4, message: "Yes"},
                {id: 5, message: "hi"},
                {id: 6, message: "hi"},
            ],
            newDialogText: "",
        },
        sideBar: {}
    },
    _callSubscriber() {},
    getState() {
        return this._state;
    },
    subscriber(observer: any) {
        this._callSubscriber = observer;
    },
    dispatch(action: any) {
        if (action.type === "ADD-POST") {
            let newPost = {
                id: 7,
                message: this._state.profilePage.newPostText,
                likeCount: 0
            }
            this._state.profilePage.postData.push(newPost);
            this._state.profilePage.newPostText = "";
            this._callSubscriber(this._state);
        } else if (action.type === "UPDATE-NEW-POST-TEXT") {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        } else if (action.type === "ADD-DIALOG") {
            let newDialog = {
                id: 10,
                message: this._state.messagePage.newDialogText,
            }
            this._state.messagePage.messageData.push(newDialog);
            this._state.messagePage.newDialogText = "";
            this._callSubscriber(this._state);
        } else if (action.type === "UPDATE-NEW-DIALOG-TEXT") {
            this._state.messagePage.newDialogText = action.newDialText;
            this._callSubscriber(this._state);
        }
    }
}

export default store;