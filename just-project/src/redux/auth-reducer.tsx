import { loginApi } from "../API/loginApi"
import { FormAction, stopSubmit } from "redux-form"
import { ThunkAction } from "redux-thunk"
import { InferActionsType, RootState } from "./reduxStore"
import { ResultCodeType } from "../API/api"

const SET_AUTH_DATA = "SET_AUTH_DATA"
const SET_LOADING = "SET_LOADING"


const initialState = {
    id: null as null | number,
    login: null as null | string,
    email: null as null | string,
    captchaSrc: null as null | string,
    isAuth: false,
    loading: false
}
export type AuthInitialStateType = typeof initialState
const authReducer = (state = initialState, action: AuthActionTypes): AuthInitialStateType => {
    switch (action.type) {
        case "SET_AUTH_DATA":
            return {
                ...state,
                id: action.id,
                login: action.login,
                email: action.email,
                isAuth: action.isAuth,
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.loading
            }
        case 'SET_CAPTCHA':
            return {
                ...state,
                captchaSrc: action.captchaSrc

            }
        default:
            return state
    }

}
const authActions = {
    setAuthData: (id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({ type: SET_AUTH_DATA, id, login, email, isAuth, } as const),
    setLoading: (loading: boolean) => ({ type: SET_LOADING, loading } as const),
    setCaptcha: (captchaSrc: string | null) => ({ type: 'SET_CAPTCHA', captchaSrc } as const)
}


export type AuthActionTypes = InferActionsType<typeof authActions>

export let setLoginData = (email: string, password: string, rememberMe: boolean, captcha: string):
    ThunkAction<void, RootState, unknown, AuthActionTypes | FormAction> => {
    return (dispatch) => {
        dispatch(authActions.setLoading(true))
        loginApi.login({ email, password, rememberMe, captcha })
            .then(data => {
                if (data.resultCode === ResultCodeType.Success) {
                    let promis = dispatch(getAuthData())
                    Promise.all([promis])
                        .then(() => {
                            dispatch(authActions.setLoading(false))
                            dispatch(authActions.setCaptcha(null))
                        })
                }
                else if (data.resultCode = ResultCodeType.CaptchaIsRecuired) {
                    loginApi.getCaptcha()
                        .then(data => {
                            debugger
                            dispatch(authActions.setCaptcha(data.url))
                            dispatch(authActions.setLoading(false))
                        })
                }
                else {
                    dispatch(authActions.setLoading(false))
                    let message = data.messages.length > 0 ? data.messages[0] : "Some error";
                    dispatch(stopSubmit("login", { _error: message }));
                }
            })
    }
}


export let getAuthData = (): ThunkAction<void, RootState, unknown, AuthActionTypes> => async (dispatch) => {
    let data = await loginApi.isAuthorized()
    if (data.resultCode === ResultCodeType.Success) {
        dispatch(authActions.setAuthData(data.data.id, data.data.login, data.data.email, true))
        dispatch(authActions.setLoading(false))
    }
}
export let logoutProfile = (): ThunkAction<void, RootState, unknown, AuthActionTypes> => (dispatch) => {
    loginApi.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(authActions.setAuthData(null, null, null, false))
            }
        })
}


export default authReducer