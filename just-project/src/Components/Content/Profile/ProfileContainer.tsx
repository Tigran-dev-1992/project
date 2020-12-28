import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getUserProfile, getUserStatus, actions, updateUserData, setUserStatus, loadFile} from '../../../redux/profile-reducer'
import { compose } from 'redux'
import { profileSelector, idSelector, statusSelector, editModeSelector, loadingInProgresSelector, showEditButtonsSelector } from '../../../redux/selectores/profile-selector'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { WithPaginatorVisibility } from '../../HOCS/Hocs'
import { RootState } from '../../../redux/reduxStore'
import { ProfileType } from "../../commons/CommonsFileTypes/ProfileType"


type Params = {
    id : string
}
class ProfileContainer extends React.Component<ProfilePropsType&RouteComponentProps<Params>>{

    componentDidMount() {
        this.props.setEditMode(false)
        let id:number|null = +this.props.match.params.id || this.props.id
      
        if (!id) {
            id = this.props.id
        }

        if (!id) {
            this.props.history.push("/login"); 
        }
        if (id) {
            this.props.getUserProfile(id)
            this.props.getUserStatus(id)
        }

        id === this.props.id ? this.props.setShowEditButtonsMode(true) : this.props.setShowEditButtonsMode(false)


    }

    componentDidUpdate(prevProps:ProfilePropsType&RouteComponentProps<Params>) {
        if (prevProps.match.params.id != this.props.match.params.id) {
            this.componentDidMount()
        } else if (!this.props.id && !prevProps.match.params.id) {
            this.props.history.push("/login");
        }
    }


    render() {
        return (
            <Profile {...this.props} />
        )
    }
}
type MapStateToPropsType = {
    profile: ProfileType | null
    id: number | null
    status: string | undefined
    editMode: boolean
    loadingInProgres: boolean
    showEditButtons: boolean
}
type MapDispatchToPropsType = {
    getUserProfile: (id: number) => void
    getUserStatus: (id: number) => void
    setEditMode: (editMode: boolean) => void
    updateUserData: (data: ProfileType) => void
    setUserStatus: (status: string) => void
    loadFile: (photos: File|null) => void
    setShowEditButtonsMode: (showEditButtons: boolean) => void
}
const setEditMode = actions.setEditMode
const setShowEditButtonsMode =actions.setShowEditButtonsMode
export type ProfilePropsType = MapDispatchToPropsType&MapStateToPropsType
let mapStateToProps = (state: RootState): MapStateToPropsType => {
    return {
        profile: profileSelector(state),
        id: idSelector(state),
        status: statusSelector(state),
        editMode: editModeSelector(state),
        loadingInProgres: loadingInProgresSelector(state),
        showEditButtons: showEditButtonsSelector(state)
    }
}

export default compose<React.ComponentType>(WithPaginatorVisibility, withRouter, connect(mapStateToProps,
    { getUserProfile, getUserStatus, setEditMode, updateUserData, setUserStatus, loadFile, setShowEditButtonsMode }))(ProfileContainer)