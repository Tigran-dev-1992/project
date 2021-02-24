import { Dispatch } from "redux"
import { chatUsersType, subscribeActions } from "../redux/dialogs-reducer"
import { InferActionsType } from "../redux/reduxStore"

export type chatUsersApiType = {
    userId: number
    photo: string
    message: string
    userName: string
}
export type StatusType = "panding" | "raddy"


type StatusChangeLisnerType = (status: StatusType) => void

let ws: WebSocket | null = null
type SubscriberType = (message: chatUsersType[]) => void
let subscriber: SubscriberType
let subscribers = {
    'messageEvent': [] as SubscriberType[],
    'statusEvent': [] as StatusChangeLisnerType[]
}

type EventType = 'messageEvant' | 'statusEvent'

const handlerClose = () => {
    ws?.removeEventListener('message', messageEvent)
    ws?.removeEventListener('close', handlerClose)
    ws?.close()
    console.log('kkkk')
    setTimeout(creatChannel, 2000)
    // subscribers['messageEvent'].forEach(s => s([]))
    subscribers['statusEvent'].forEach(s => s('panding'))
}
const messageEvent = (e: MessageEvent) => {
    let messages = JSON.parse(e.data)
    subscribers['messageEvent'].forEach(s => s(messages))

}
function creatChannel() {
    ws?.removeEventListener('message', messageEvent)
    ws?.removeEventListener('close', handlerClose)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', handlerClose)
    ws.addEventListener('message', messageEvent)
    ws&&subscribers['statusEvent'].forEach(s => s('raddy'))
}
export type SubscribeActionType =
    InferActionsType<typeof subscribeActions>

export const dialogsApi = {
    start() {
        creatChannel()
    },
    stop() {
        ws?.removeEventListener('close', handlerClose)
        ws?.removeEventListener('message', messageEvent)
        ws?.close()
        ws = null
    },
   
    subscribe(action:SubscribeActionType,dispatch:Dispatch) {
        switch (action.event) {
            case "messageEvant":
                {
                  subscribers['messageEvent'].push(action.messageChatCallbackCreator(dispatch))
                }
               break
                case "statusEvent" :
                    {
                        subscribers['statusEvent'].push(action.statusTypeCalbackCreator(dispatch))
                    }
                    break
        }
    },
    unSubscribe(action:SubscribeActionType,dispatch:Dispatch) {
        ws?.removeEventListener('message', messageEvent)
        ws?.removeEventListener('close', handlerClose)
        ws?.close()
        switch (action.event) {
            case "messageEvant":
                {
                    subscribers['messageEvent']=  subscribers['messageEvent'].filter(s=>s!==action.messageChatCallbackCreator(dispatch))
                }
                break
                case "statusEvent" :
                    {
                        subscribers['statusEvent']= subscribers['statusEvent'].filter(s=>s!==action.statusTypeCalbackCreator(dispatch))
                    }
                    break
        }
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
}
