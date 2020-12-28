import { RootState } from "../reduxStore"

export const profileSelector = (state:RootState) => {
    return state.profilePage.profile
}

export const idSelector = (state:RootState) => {
    return state.auth.id
}

export const statusSelector = (state:RootState) => {
    return state.profilePage.status
}

export const editModeSelector = (state:RootState) => {
    return state.profilePage.editMode
}

export const loadingInProgresSelector = (state:RootState) => {
    return state.profilePage.loadingInProgres
}

export const showEditButtonsSelector = (state:RootState) => {
    return state.profilePage.showEditButtons
}








