import React from 'react'
import LoginReduxForm from './LoginForm'
import styles from './Login.module.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'


export type LoginDataValueType ={email : string,password: string,rememberMe : boolean,captcha : string}
export type SetLoginDataType =(email : string,password: string,rememberMe : boolean,captcha :string)=>void
export type LoginPropsType = {
    setLoginData : (email : string,password: string,rememberMe : boolean,captcha : string)=>void
    captchaSrc: string|null
}
const Login :React.FC<LoginPropsType> = (props) =>{
    useEffect(() => {
        Aos.init({ duration: 1500 })
    }, [])
    let setData = (value:LoginDataValueType)=>{
        props.setLoginData(value.email,value.password,value.rememberMe,value.captcha)
    }
    return (
        <div className ={styles.login} data-aos='zoom-in'>
            <h2>Are you registrated?</h2>
            <LoginReduxForm onSubmit ={setData}  captchaSrc={props.captchaSrc}  />
            <br/>

            (email:   tikokarap@mail.ru)<br/>
            (pasword: it9284593272)
        </div>
    )
}

export default Login