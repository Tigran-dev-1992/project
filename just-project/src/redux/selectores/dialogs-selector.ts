import { RootState } from "../reduxStore";

export const chatUsersSelector=(state:RootState)=>{return state.dialogs.chatUsers}