import authReducer from "./auth-reducer"
import { createStore, applyMiddleware } from "redux"
import { combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import profileReducer from "./profile-reducer"
import UserReducer from "./user-reducer"
import AppReducer from "./app-reducer"


let reducers = combineReducers({
    auth: authReducer,
    form: formReducer,
    profilePage: profileReducer,
    usersPage: UserReducer,
    app: AppReducer
})
export type RootState = ReturnType<typeof reducers>


export const store = createStore(reducers, applyMiddleware(thunkMiddleware))


type ProprtisType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<ProprtisType<T>>

// @ts-ignore
window.__store__ = store;

export default store