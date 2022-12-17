import React, {useEffect} from 'react';
import ChatMessages from "./ChatMessages";
import ChatForm from "./ChatForm";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {useDispatch} from "react-redux";
import {startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";

const Chat: React.FC = () => {

    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])
    return (
        <div>
            <ChatMessages/>
            <ChatForm/>
        </div>
    )
}

const ChatContainer = compose<React.ComponentType>(withAuthRedirect)(Chat)
export default ChatContainer