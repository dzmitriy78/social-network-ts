import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {sendMessage} from "../../redux/chat-reducer";

const ChatForm: React.FC = () => {

    const [message, setMessage] = useState<string>("")
    //const [statusChannel, setStatusChannel] = useState<"pending" | "open">("pending")

    const dispatch = useDispatch<any>()

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage("")
    }
    return (
        <div>
            <div>
            <textarea value={message}
                      onChange={(e) => setMessage(e.currentTarget.value)}>
            </textarea>
            </div>
            <div>
                <button onClick={sendMessageHandler} disabled={false}>
                    Send
                </button>
            </div>
        </div>
    )
}

export default ChatForm