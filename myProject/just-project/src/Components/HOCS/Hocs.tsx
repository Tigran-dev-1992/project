import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { userActions} from '../../redux/user-reducer'
import { actions } from '../../redux/profile-reducer'
import { RootState } from '../../redux/reduxStore'
import { ProfileType } from "../commons/CommonsFileTypes/ProfileType"

export function withRedirectToLogin<WCP>(Component:React.ComponentType<WCP>){
    let mapStateToProps = (state:RootState) => {
        return {
            isAuth: state.auth.isAuth
        }
    }
    type MapStateType = {
        isAuth :boolean
    }
    type MapDispatchType={}
    let RedirectComponenet: React.FC<MapStateType&MapDispatchType> = (props) => {
      let  {isAuth,...restProps}=props
        if (!props.isAuth) return <Redirect to='/login' />
        
        return (
            <Component {...restProps  as WCP} />
        )

    }

    return connect<MapStateType,MapDispatchType,WCP,RootState>(mapStateToProps, {})(RedirectComponenet)
}



export function WithPaginatorVisibility<WCP>(Component:React.FunctionComponent<WCP>){
    const setShowLoader = userActions.setShowLoader
    let mapStateToProps = () => {
        return {
            
        }
    }
    type MapDispatchToPropsType={
        setShowLoader: (showLoader : boolean)=>void
    }
    let PaginatorVisibility:React.FunctionComponent<MapDispatchToPropsType>= (props) => {
      useEffect(()=>{props.setShowLoader(true)},[])  
      let {setShowLoader,...restProps}=props
        return (
            <Component {...restProps as WCP} />
        )

    }

    return connect<{},MapDispatchToPropsType,WCP,RootState>(mapStateToProps, {setShowLoader})(PaginatorVisibility)
}





export function WithClearProfileData<WCP>(Component:React.FunctionComponent<WCP>){
    const setProfile = actions.setProfile
    let mapStateToProps = () => {
        return {
            
        }
    }
    type MapDispatchToPropsType={
        setProfile: (profile : ProfileType|null)=>void
    }
    let ClearProfile:React.FunctionComponent<MapDispatchToPropsType>= (props) => {
        let {setProfile,...restProps}=props
      useEffect(()=>{props.setProfile(null)},[])  
        return (
            <Component {...restProps as WCP} />
        )

    }

    return connect<{},MapDispatchToPropsType,WCP,RootState>(mapStateToProps, {setProfile})(ClearProfile)
}
















