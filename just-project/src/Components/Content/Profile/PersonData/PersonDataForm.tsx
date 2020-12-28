import React from 'react'
import { createField } from '../../../commons/CreateField'
import { Input, Textarea } from '../../../commons/Input'
import { InjectedFormProps, reduxForm } from 'redux-form'
import styles from './PersonData.module.css'
import { ProfileType } from '../../../commons/CommonsFileTypes/ProfileType'

type PropsType = {

}
const PersonDataForm :React.FunctionComponent<InjectedFormProps<ProfileType>> = (props) => {
    return (
        <div>
            <div className={styles.error}>
                {props.error}
            </div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <b>FullName </b> {createField('fullName', '', [], Input,{},'')}
                    <b>AboutMe </b> {createField('aboutMe', '', [], Textarea,{},'')}
                    <b>Lookingfor a job </b> {createField('lookingForAJob', '', [], Input, { type: 'checkbox' },'')}
                    <b>Lookingfor a job description :</b> {createField('lookingForAJobDescription', '', [], Textarea,{},'')}
                    <b>Facebook</b> {createField('contacts.facebook', '', [], Input,{},'')}
                    <b>Website</b> {createField('contacts.webSite', '', [], Input,{},'')}
                    <b>Vk</b> {createField('contacts.vk', '', [], Input,{},'')}
                    <b>Twitter</b> {createField('contacts.twitter', '', [], Input,{},'')}
                    <b>Instagram</b> {createField('contacts.instagram', '', [], Input,{},'')}
                    <b>Youtube</b> {createField('contacts.youtube', '', [], Input,{},'')}
                    <b>Github</b> {createField('contacts.github', '', [], Input,{},'')}
                    <b>Mainlink</b> {createField('contacts.mainLink', '', [], Input,{},'')}
                    <button>Save</button>
                </div>
            </form>
        </div>
    )
}

export default reduxForm<ProfileType>({ form: 'personData' })(PersonDataForm)