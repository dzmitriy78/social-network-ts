import React, {useState} from 'react';
import {ws} from "./Chat";

const ChatForm: React.FC = () => {

    const [message, setMessage] = useState<string>("")

    const sendMessage = () => {
        if (message) {
            ws.send(message)
            setMessage("")
        }
    }
    return (
        <div>
            <div>
            <textarea value={message}
                      onChange={(e) => setMessage(e.currentTarget.value)}>
            </textarea>
            </div>
            <div>
                <button onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    )
}

export default ChatForm