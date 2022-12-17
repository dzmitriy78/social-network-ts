import React from 'react';
import {ChatMessageType} from "../../api/chatAPI";

const ChatMessage: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div>
            <img src={message.photo} style={{width: 40}} alt={"chatAvatar"}/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <br/>
            <hr/>
        </div>
    )
}

export default ChatMessage