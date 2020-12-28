import { ThunkAction } from "redux-thunk"
import { ResultCodeType } from "../API/api"
import { userApi } from "../API/userApi"
import { followUnfollowFlow } from "../Components/commons/followUnfollowFlow"
import { InferActionsType, RootState } from "./reduxStore"

const SET_USERS = 'SET_USERS'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_PORCE_NUMBER = 'SET_PORCE_NUMBER'
const SET_FOLLOW_UNFOLLOW_USER = 'SET_FOLLOW_UNFOLLOW_USER'
const FOLLOW_IN_PROGRES = 'FOLLOW_IN_PROGRES'
const SHOW_LOADER = 'SHOW_LOADER'
const SET_FILTER_VIZIBILITY = 'SET_FILTER_VIZIBYLITY'
const SET_FILTER = 'SET_FILTER'

export type PhotosType = {
    small: string | null
    large: string | null
}
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

const initialState= {
    filter :{
        term: "",
        friend : null as null|boolean
    },
    totalCount: 0,
    pageSize: 100,
    porcionSize: 10,
    porceNumber: 1,
    currentPage: 1,
    users: [] as Array<UserType>,
    followInProgres: [] as Array<number>,
    showLoader: false,
    filterVizibility:true
}


type InitialStateType = typeof initialState

type FilterType = {
    term :string
    friend: null|boolean
}





const UserReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {

        case 'SET_USERS':
            return {
                ...state,
                users: action.users 
            }
            case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }
                case 'SET_FILTER_VIZIBYLITY':
                return {
                    ...state,
                    filterVizibility: action.filterVizibility
                } 
        case 'SET_TOTAL_COUNT':
            return {
                ...state,
                totalCount: action.totalCount
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SET_PORCE_NUMBER':
            return {
                ...state,
                porceNumber: action.porceNumber
            }
        case 'SET_FOLLOW_UNFOLLOW_USER':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return { ...u, followed: action.follow } 
                    }
                    return u 

                })
            }
        case 'FOLLOW_IN_PROGRES':
            return {
                ...state,
                followInProgres: action.isFetching
                    ? [...state.followInProgres, action.id]
                    : state.followInProgres.filter(id => id != action.id) 
            } 
        case 'SHOW_LOADER':
            return {
                ...state,
                showLoader: action.showLoader
            }
        default:
            return state
    }
}
export const userActions={
    setUsers : (users: Array<UserType>) => ({ type: SET_USERS, users }as const), 
    setFilter : ({term,friend}:FilterType) => ({ type: SET_FILTER,payload: {term,friend} }as const), 
    setUsersFilter : (users: Array<UserType>) => ({ type: SET_USERS, users }as const), 
    setTotalCount : (totalCount: number) => ({ type: SET_TOTAL_COUNT, totalCount }as const),
    setCurrentPage : (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage }as const),
    setPorceNumber : (porceNumber: number) => ({ type: SET_PORCE_NUMBER, porceNumber }as const),
    setFollowUnfollowUser : (follow:boolean,id: number) => ({ type: SET_FOLLOW_UNFOLLOW_USER, id,follow }as const),
    setFolowInProgres : (isFetching: boolean, id: number) => ({ type: FOLLOW_IN_PROGRES, isFetching, id }as const),
    setShowLoader : (showLoader: boolean) => ({ type: SHOW_LOADER, showLoader }as const),
    setFilterVizibility : (filterVizibility: boolean) => ({ type: SET_FILTER_VIZIBILITY, filterVizibility }as const)
}


type ActionsType = InferActionsType<typeof userActions>

export const getUsers = (pageSize: number, currentPage: number,term: string,friend:boolean|null): ThunkAction<void, RootState, unknown, ActionsType> => (dispatch) => {
    dispatch(userActions.setShowLoader(true))
    dispatch(userActions.setFilter({term,friend}))
    userApi.getUsersData(pageSize, currentPage,term,friend)
        .then(data => {
            dispatch(userActions.setUsers(data.items))
            dispatch(userActions.setTotalCount(data.totalCount))
            dispatch(userActions.setCurrentPage(currentPage))
            dispatch(userActions.setShowLoader(false))
        })
}

export const getCurrentPage = (pageSize: number, currentPage: number, porceNumber: number,term: string,friend:boolean|null): ThunkAction<void, RootState, unknown, ActionsType> => (dispatch) => {
    dispatch(userActions.setShowLoader(true))
    userApi.getUsersData(pageSize, currentPage,term,friend)
        .then(data => {
            dispatch(userActions.setUsers(data.items))
            dispatch(userActions.setCurrentPage(currentPage))
            dispatch(userActions.setPorceNumber(porceNumber))
            dispatch(userActions.setShowLoader(false))
        })
}
export const followUnfollowUser = (follow: boolean,id: number): ThunkAction<void, RootState, unknown, ActionsType> => (dispatch) => {
    dispatch(userActions.setFolowInProgres(true, id))
    followUnfollowFlow(follow,id)
        .then(data => {
            if (data.resultCode === ResultCodeType.Success) {
                dispatch(userActions.setFollowUnfollowUser(follow,id))
                dispatch(userActions.setFolowInProgres(false, id))
            }
        })
}

export default UserReducer


