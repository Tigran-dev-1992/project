import { ProfileType } from "../Components/commons/CommonsFileTypes/ProfileType"
import { profileApi } from "../API/profileApi"
import { FormAction, stopSubmit } from "redux-form"
import { ThunkAction } from "redux-thunk"
import { PhotosType } from "./user-reducer"
import { RootState, InferActionsType } from "./reduxStore"



const SET_PROFILE = 'SET_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SET_EDIT_MODE = 'SET_EDIT_MODE'
const SET_PHOTOS = 'SET_PHOTOS'
const SET_LOADING_IN_PROGRES = 'SET_LOADING_IN_PROGRES'
const SET_SHOW_EDIT_BUTTONS_MODE = 'SET_SHOW_EDIT_BUTTONS_MODE'


export type InitialStateType = {
    profile: ProfileType | null
    status: string | undefined
    editMode: boolean
    loadingInProgres: boolean
    showEditButtons: boolean
}

const initialState: InitialStateType = {
    profile: null,
    status: undefined,
    editMode: false,
    loadingInProgres: false,
    showEditButtons: false
}


export const profileReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.profile
            }

        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SET_EDIT_MODE':
            return {
                ...state,
                editMode: action.editMode
            }
        case 'SET_PHOTOS':
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        case 'SET_LOADING_IN_PROGRES':
            return {
                ...state,
                loadingInProgres: action.loadingInProgres
            }
        case 'SET_SHOW_EDIT_BUTTONS_MODE':
            return {
                ...state,
                showEditButtons: action.showEditButtons
            }
        default:
            return state
    }
}

type ActionTypes = InferActionsType<typeof actions>

export const actions = {
    setProfile: (profile: ProfileType | null) => ({ type: SET_PROFILE, profile } as const),
    setStatus: (status: string) => ({ type: SET_STATUS, status } as const),
    setPhotos: (photos: PhotosType) => ({ type: SET_PHOTOS, photos } as const),
    setLoadingInProgres: (loadingInProgres: boolean) => ({ type: SET_LOADING_IN_PROGRES, loadingInProgres } as const),
    setShowEditButtonsMode: (showEditButtons: boolean) => ({ type: SET_SHOW_EDIT_BUTTONS_MODE, showEditButtons } as const),
    setEditMode: (editMode: boolean) => ({ type: SET_EDIT_MODE, editMode } as const)
}





export const getUserProfile = (id: number | null): ThunkAction<void, RootState, unknown, ActionTypes> => async (dispatch) => {
    dispatch(actions.setLoadingInProgres(true))
    let data = await profileApi.getProfile(id)
    dispatch(actions.setProfile(data))
    dispatch(actions.setLoadingInProgres(false))
}


export const getUserStatus = (id: number): ThunkAction<void, RootState, unknown, ActionTypes> => async (dispatch) => {
    let data = await profileApi.getStatus(id)
    dispatch(actions.setStatus(data))
}

export const updateUserData = (data: ProfileType): ThunkAction<void, RootState, unknown, ActionTypes | FormAction> => async (dispatch, getState) => {
    dispatch(actions.setLoadingInProgres(true))
    let id = getState().auth.id
    let response = await profileApi.setUserData(data)
    if (response.resultCode === 0) {
        if (id != null) {
            dispatch(getUserProfile(id))
        }

        dispatch(actions.setEditMode(false))
        dispatch(actions.setLoadingInProgres(false))
    } else {
        let message = response.messages.length > 0 ? response.messages[0] : "Some error";
        dispatch(stopSubmit("personData", { _error: message }));
        dispatch(actions.setLoadingInProgres(false))
    }
}


export const setUserStatus = (status: string): ThunkAction<void, RootState, unknown, ActionTypes> => async (dispatch) => {
    dispatch(actions.setLoadingInProgres(true))
    let data = await profileApi.setStatusText(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
        dispatch(actions.setLoadingInProgres(false))
    }
}

export const loadFile = (file: File): ThunkAction<void, RootState, unknown, ActionTypes> => async (dispatch) => {
    dispatch(actions.setLoadingInProgres(true))
    let data = await profileApi.setImage(file)
    if (data.resultCode === 0) {
        dispatch(actions.setPhotos(data.data.photos))
        dispatch(actions.setLoadingInProgres(false))
    }
}

export default profileReducer