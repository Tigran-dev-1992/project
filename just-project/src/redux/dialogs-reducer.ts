import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { v1 } from "uuid"
import { chatUsersApiType, dialogsApi, StatusType } from "../API/dialogsApi"
import { InferActionsType, RootState } from "./reduxStore"

const SET_CHAT_USERS = 'SET_CHAT_USERS'
const SET_STATUS = 'SET_STATUS'


export type chatUsersType = chatUsersApiType & { id: string }

type InitialStateType = {
    chatUsers: Array<chatUsersType>
    status: StatusType
}
const initialState: InitialStateType = {
    chatUsers: [],
    status: 'panding'
}


const DialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_CHAT_USERS":
            return {
                ...state,
                chatUsers: [...state.chatUsers, ...action.chatUsers.map(u => ({ ...u, id: v1() }))].filter((u,index,array)=>index>(array.length-101))
            }
        case "SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        default: return state
    }
}
type ActionsType = InferActionsType<typeof dialogsActions>
export const dialogsActions = {
    setChatUsers: (chatUsers: chatUsersApiType[]) => ({ type: SET_CHAT_USERS, chatUsers } as const),
    setStatus: (status: StatusType) => ({ type: SET_STATUS, status } as const)
}

let _messageChatCallback: ((chatUsers: chatUsersApiType[]) => void) | null = null
let _statusTypeCallback: ((status: StatusType) => void) | null = null

const statusTypeCalbackCreator = (dispatch: Dispatch) => {
    if (_statusTypeCallback === null) {
        return _statusTypeCallback = (status: StatusType) => {
            dispatch(dialogsActions.setStatus(status))
        }
    }
    return _statusTypeCallback
}
const messageChatCallbackCreator = (dispatch: Dispatch) => {
    if (_messageChatCallback === null) {
        return _messageChatCallback = (messages: chatUsersApiType[]) => {
            dispatch(dialogsActions.setChatUsers(messages))
        }
    }
    return _messageChatCallback
}
export const subscribeActions ={
    messageEvant:() => ({event:'messageEvant', messageChatCallbackCreator} as const),
    statusEvent:() => ({event:'statusEvent',statusTypeCalbackCreator} as const)
}
export const creatChat = (): ThunkAction<void, RootState, unknown, ActionsType> => async (dispatch) => {
    dialogsApi.subscribe(subscribeActions.messageEvant(),dispatch)
    dialogsApi.subscribe(subscribeActions.statusEvent(),dispatch)
    dialogsApi.start()
}
export const deleteChat = (): ThunkAction<void, RootState, unknown, ActionsType> => async (dispatch) => {
    dialogsApi.subscribe(subscribeActions.messageEvant(),dispatch)
    dialogsApi.subscribe(subscribeActions.statusEvent(),dispatch)
    // dialogsApi.unSubscribe(subscribeActions.messageEvant(),dispatch)
    // dialogsApi.unSubscribe(subscribeActions.statusEvent(),dispatch)
    dispatch(dialogsActions.setChatUsers([]))
}
export const sendMessage = (message: string) => {
    dialogsApi.sendMessage(message)

}


export default DialogsReducer