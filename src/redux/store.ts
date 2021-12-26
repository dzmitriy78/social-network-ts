
import profileReducer from "./profile-reducer";
import messageReducer from "./message-reducer";
import sidebarReducer from "./sidebar-reducer";

export type MessageDataType = {
    id: number
    message: string
}
export type DialogsDataType = {
    id: number
    name: string
    avatar: string
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
    sideBar?: SideBar
}
export type GlobalStoreType = {
    _state: Root_StateType
    _callSubscriber: (callback: Root_StateType) => void
    getState: () => Root_StateType
    subscriber: (callback: (state: Root_StateType) => void) => void
    dispatch: (action: { type: string; newText: string; newDialText: string })=>void
}

export type ActionTypes = ReturnType<any>

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
            ],
            newDialogText: "",
        },
        sideBar: {}
    },
    _callSubscriber() {
    },
    getState() {
        return this._state;
    },
    subscriber(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        // @ts-ignore
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        // @ts-ignore
        this._state.messagePage = messageReducer(this._state.messagePage, action);
        this._state.sideBar = sidebarReducer(this._state.sideBar);
        this._callSubscriber(this._state);
    }
}
export default store;