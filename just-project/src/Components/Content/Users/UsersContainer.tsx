import React, { FunctionComponent } from 'react'
import Users from './Users'
import { getUsers, getCurrentPage, followUnfollowUser, UserType, userActions } from '../../../redux/user-reducer'
import { connect } from 'react-redux'
import {
    pageSizeSelector, totalCountSelector, porcionSizeSelector, porceNumberSelector,
    currentPageSelector, usersSelector, followInProgresSelector, showLoaderSelector,
    termSelector, friendSelector,  filterFizibilitySelector
} from '../../../redux/selectores/users-selector'
import { compose } from 'redux'
import { WithClearProfileData } from '../../HOCS/Hocs'
import { RootState } from '../../../redux/reduxStore'




const MyUsersContainer: FunctionComponent= (props) => {
    return (
        <div>
            <Users/>
        </div>
    )
}
export type UserPropsType = MapStateToPropsType & MapDispatchToProps

type MapStateToPropsType = {
    term: string
    friend: boolean | null
    pageSize: number
    totalCount: number
    porcionSize: number
    porceNumber: number
    currentPage: number
    users: Array<UserType>
    followInProgres: Array<number>
    showLoader: boolean
    filterVizibility: boolean
}
const setFilterVizibility = userActions.setFilterVizibility
type MapDispatchToProps = {
    getUsers: (pageSize: number, currentPage: number, term: string, friend: boolean | null) => void
    getCurrentPage: (pageSize: number, currentPage: number, porceNumber: number, term: string, friend: boolean | null) => void
    followUnfollowUser: (follow: boolean, id: number) => void
    setFilterVizibility: (filterVizibility: boolean) => void

}
let mapStateToProps = (state: RootState) => {
    return {
        term: termSelector(state),
        friend: friendSelector(state),
        pageSize: pageSizeSelector(state),
        totalCount: totalCountSelector(state),
        porcionSize: porcionSizeSelector(state),
        porceNumber: porceNumberSelector(state),
        currentPage: currentPageSelector(state),
        users: usersSelector(state),
        followInProgres: followInProgresSelector(state),
        showLoader: showLoaderSelector(state),
        filterVizibility: filterFizibilitySelector(state)
    }
}
const UsersContainer = compose<React.ComponentType>(WithClearProfileData, connect<MapStateToPropsType, MapDispatchToProps, {}, RootState>(
    mapStateToProps, { getUsers, getCurrentPage, followUnfollowUser, setFilterVizibility }))(MyUsersContainer)
    export default React.memo(UsersContainer)