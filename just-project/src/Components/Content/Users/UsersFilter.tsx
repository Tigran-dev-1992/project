import React from 'react'
import { useDispatch } from 'react-redux'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField } from '../../commons/CreateField'
import { Input } from '../../commons/Input'
import { Select } from '../../commons/Select'
import styles from './Users.module.css'
import {userActions} from '../../../redux/user-reducer'

type FormData = {
    term: string
    friend: string
}
type PropsType = {
    filterVizibility: boolean
}
type NameType = Extract<keyof FormData, string>

const UsersFilter: React.FunctionComponent<InjectedFormProps<FormData, PropsType> & PropsType> = ({ handleSubmit, filterVizibility}) => {
    const dispatch = useDispatch()
    const onClick = () => {
        dispatch(userActions.setFilterVizibility(!filterVizibility))
    }
    return (
        <div className={styles.formContainer}  >
            <div className={styles.form}>
                <div className={styles.filterIconBlok} onClick={onClick}>
                    Filter
                 </div >
                {filterVizibility
                    ? <form onSubmit={handleSubmit} className={styles.blank}>
                        {createField<NameType>("friend", "", [], Select, {type:"select" }, '')}
                        {createField<NameType>("term", "enter user name", [], Input, { type: 'search'}, '')}
                    </form>
                    : ""
                }
            </div>
        </div>

    )
}
const UsersFilterForm = reduxForm<FormData, PropsType>({ form: 'usersFilter'})(UsersFilter)
export default UsersFilterForm






