import { InferActionsType } from "./reduxStore"

const SET_CHAT_USERS = 'SET_CHAT_USERS'






export type chatUsersType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type InitialStateType = {
    chatUsers: Array<chatUsersType>
}
const initialState: InitialStateType = {
    chatUsers: []
}


const DialogsReducer = ( state = initialState,action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_CHAT_USERS":
            return {
                ...state,
                chatUsers: state.chatUsers.concat(action.chatUsers) 
            }

        default: return state
    }
}
type ActionsType = InferActionsType<typeof dialogsActions>
export const dialogsActions = {
    setChatUsers: (chatUsers: chatUsersType[]) => ({ type: SET_CHAT_USERS, chatUsers }as const)
}
export default DialogsReducer