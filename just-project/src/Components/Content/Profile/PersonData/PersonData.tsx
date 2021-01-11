import React from 'react'
import {  ProfileType } from '../../../commons/CommonsFileTypes/ProfileType'
import Contacts from './Contacts'
import styles from './PersonData.module.css'
import PersonDataForm from './PersonDataForm'



type PropsType ={
    profile: ProfileType
    setEditMode : (editMode: boolean) => void
    editMode : boolean
    updateUserData:(data: ProfileType) => void
    showEditButtons:boolean
}

const PersonData : React.FunctionComponent<PropsType> = ({ profile, setEditMode, editMode,updateUserData,showEditButtons }) => {

    
    const onSubmit = (value : ProfileType) =>{
        updateUserData(value)
    }

    return (
        <div>
            {editMode
                ? <div className= {styles.form}>
                    <PersonDataForm  initialValues = {profile} onSubmit= {onSubmit}/>
                </div>
                : <div className={styles.personData}>
                    <div>
                        <b>Full name :</b> {profile.fullName}
                    </div>
                    <div>
                        <b>About me :</b> {profile.aboutMe}
                    </div>
                    <div>
                        <b>Lookingfor a job :</b> {profile.lookingForAJob ? "Yes" : "No"}
                    </div>
                    {profile.lookingForAJob &&
                        <div>
                            <b>Lookingfor a job description :</b> {profile.lookingForAJobDescription}
                        </div>
                    }
                    <div>
                        
                        <b>Contacts : </b> <Contacts contacts={profile.contacts} />
                    </div>
                    {showEditButtons&&<button className={styles.button} onClick={() => setEditMode(true)}>Edit my data</button>}
                </div>
            }


        </div>

    )
}



export default PersonData
