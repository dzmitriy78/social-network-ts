import React from 'react';
import ChatMessage from "./ChatMessage";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";

const ChatMessages: React.FC = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return (
        <div style={{height: 400, overflowY: "auto"}}>
            {messages.map((m, i) => {
                return <ChatMessage key={i} message={m}/>
            })}
        </div>
    )
}

export default ChatMessages