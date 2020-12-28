import React, { useEffect } from 'react'
import PersonData from './PersonData/PersonData'
import styles from './Profile.module.css'
import Status from './Status'
import UserImage from './UserImage'
import PreLoader from '../../commons/PreLoader'
import Aos from 'aos'
import 'aos/dist/aos.css'
import SmallPreLoader from '../../commons/SmallPreLoader'
import { ProfilePropsType } from './ProfileContainer'




const Profile:React.FunctionComponent<ProfilePropsType> = ({ profile, status, editMode, setEditMode, updateUserData, setUserStatus, loadFile,loadingInProgres,showEditButtons}) => {
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    if (profile) {
        return (
            <div data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000"  className = {styles.profile}>
                <div>
                {loadingInProgres&& <SmallPreLoader/>}<UserImage photos={profile.photos} loadFile={loadFile} showEditButtons={showEditButtons}/>
                </div>

                <div className={styles.status}>
                    <Status status={status} setUserStatus={setUserStatus} showEditButtons={showEditButtons}/>
                </div>

                <div >
                    <PersonData profile={profile} editMode={editMode} setEditMode={setEditMode} updateUserData={updateUserData} showEditButtons={showEditButtons}/>
                </div>
            </div>
        )
    }
    return <PreLoader />

}


export default Profile