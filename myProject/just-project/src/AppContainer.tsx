import React from 'react'
import App from './App'
import { connect } from 'react-redux'
import { isInitialaized } from './redux/app-reducer'
import PreLoader from './Components/commons/PreLoader'
import { compose } from 'redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { RootState } from './redux/reduxStore'

class AppContainer extends React.Component<PropsType&RouteComponentProps>{
    componentDidMount() {
        this.props.isInitialaized()
    }
    render() {
        if (!this.props.initialaiz) {
            return <PreLoader />
        }
        return (
            <App />
        ) 
    }
}
type MapStateToPropstype = {
initialaiz : boolean
}
type MapDispatchToPropstype = {
    isInitialaized : ()=>void
}
let mapStateToProps = (state:RootState) => {
    return {
        initialaiz: state.app.initialaiz
    }
}
type PropsType= MapDispatchToPropstype&MapStateToPropstype

export default compose<React.ComponentType>(connect(mapStateToProps, { isInitialaized }),withRouter)(AppContainer)