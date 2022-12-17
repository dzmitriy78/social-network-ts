export let subscribers = [] as SubscribersType[]

let wsChannel: WebSocket | null = null
const closeHandler = () => {
    console.log("close")
    setTimeout(createChannel, 1000)
}
const messageHandler = (e: MessageEvent) => {
    let newMessage = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessage))
}

function createChannel() {
    wsChannel?.removeEventListener("close", closeHandler)
    wsChannel?.close()

    wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    wsChannel.addEventListener("close", closeHandler)
    wsChannel.addEventListener("message", messageHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers = []
        wsChannel?.removeEventListener("close", closeHandler)
        wsChannel?.removeEventListener("message", messageHandler)
        wsChannel?.close()
    },
    subscribe(callback: SubscribersType) {
        subscribers.push(callback)
        return () => {
            subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscribersType) {
        subscribers.filter(s => s !== callback)
    },
    sendMess(message: string) {
        wsChannel?.send(message)
    }
}
type SubscribersType = (messages: ChatMessageType[]) => void
export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string

}