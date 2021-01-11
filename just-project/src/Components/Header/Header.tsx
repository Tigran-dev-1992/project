import React from 'react'
import  styles from './Header.module.css' 
import logo from '../../images/logo.png'
import { connect } from 'react-redux'
import {logoutProfile} from '../../redux/auth-reducer'
import { RootState } from '../../redux/reduxStore'


type PropsType = {
    isAuth : boolean
    logoutProfile: ()=>void
}
const Header :React.FC<PropsType> = (props) => {
    return (
        <div className={styles.header}>
            <div className={styles.elements}>
                <img src={logo} className={styles.logo} />
                {props.isAuth&&<div className={styles.logout} onClick = {props.logoutProfile}>Logout</div>}
            </div>
        </div>
    )
}
type MapStateToPropsType ={
    isAuth : boolean
}
type MapDispatchToPropsType ={
    logoutProfile :()=>void
}
let mapStateToProps = (state:RootState):MapStateToPropsType=>{
    return{
        isAuth:state.auth.isAuth
    }
}
export default  connect<MapStateToPropsType, MapDispatchToPropsType, {},RootState>(mapStateToProps,{logoutProfile})(Header) 