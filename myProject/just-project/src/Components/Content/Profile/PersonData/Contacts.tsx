import React from 'react'
import { ContactsType } from '../../../commons/CommonsFileTypes/ProfileType'
import styles from './PersonData.module.css'
type PropsType ={
    contacts:ContactsType
}
const Contacts : React.FunctionComponent<PropsType>= ({contacts}) => {
    return (
        <div className={styles.contacts}>
            {Object.keys(contacts).map(key => {
                return (
                    <div key ={key}>
                        <b>{key} :</b> {contacts[key as keyof ContactsType]||`here can be your ${key} adress`}
                    </div>
                )
            })}
        </div>
    )
}




export default Contacts
