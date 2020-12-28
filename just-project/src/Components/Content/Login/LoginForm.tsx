import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import styles from './Login.module.css'
import { Input } from '../../commons/Input'
import { maxLengthCreator, required } from '../../commons/validators'
import { createField } from '../../commons/CreateField'
import { LoginDataValueType} from './Login'



type PropsType= {
    captchaSrc: string|null
}
const maxLength = maxLengthCreator(25)

type NameType = Extract<keyof LoginDataValueType, string>
const LoginForm: React.FunctionComponent<InjectedFormProps<LoginDataValueType,PropsType>&PropsType> = ({ handleSubmit, error ,captchaSrc} ) => {
    return (
        <div className={styles.loginForm}>
            <form onSubmit={handleSubmit}>
                <div className={styles.field}>
                    {createField<NameType>("email", 'email', [maxLength, required], Input, {}, "")}
                </div>
                <div className={styles.field}>
                    {createField<NameType>('password', 'password', [maxLength, required], Input, { type: 'password' }, "")}
                </div>
                {captchaSrc
                    ? <div className={styles.field}>
                        {createField<NameType>('captcha', 'captcha', [maxLength, required], Input, {}, "")}
                        <img src={captchaSrc} />
                    </div>
                    : ""
                }
                <div className={styles.checkbox}>
                    {createField<NameType>('rememberMe', "", [], Input, { type: 'checkbox' }, 'Remember')}
                </div>
                <button className={styles.button}>Go to profile</button>
            </form>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    )
}


const LoginReduxForm = reduxForm<LoginDataValueType, PropsType>({ form: 'login' })(LoginForm)

export default LoginReduxForm
