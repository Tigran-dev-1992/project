import React from 'react';
import Login from './Login';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PreLoader from '../../commons/PreLoader';
import { compose } from 'redux';
import { WithClearProfileData } from '../../HOCS/Hocs';
import { RootState } from '../../../redux/reduxStore';
import {setLoginData} from '../../../redux/auth-reducer'

const LoginContainer: React.FunctionComponent<PropsType> = (props) => {
    if (props.isAuth) {
        return <Redirect to='/profile' />;
    } else if (props.loading) {
        return <PreLoader />;
    }
    return (
        <Login setLoginData={props.setLoginData} captchaSrc = {props.captchaSrc}/>

    );
};
type OwnPropsType = {};
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;
type MapStateToPropsType = {
    isAuth: boolean;
    loading: boolean;
    captchaSrc : string|null
};
let mapStateToProps = (state: RootState) => {
    return {
        isAuth: state.auth.isAuth,
        loading: state.auth.loading,
        captchaSrc:state.auth.captchaSrc
    };
};
type MapDispatchToPropsType = {
    setLoginData: (email: string, password: string, rememberMe: boolean,captcha :string) => void;
};
export default compose<React.ComponentType>(WithClearProfileData, connect(mapStateToProps, { setLoginData }))(LoginContainer);
