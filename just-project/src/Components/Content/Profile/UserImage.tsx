import React from 'react'
import styles from './Profile.module.css'
import userPhoto from '../../../images/userPhoto.jpg'
import { PhotosType } from '../../../redux/user-reducer'
type PropsType = {
    photos:PhotosType
    loadFile:(photos: File|null) => void
    showEditButtons :boolean
}

const UserImage:React.FunctionComponent<PropsType> = ({ photos, loadFile,showEditButtons }) => {
    let loadImage = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            loadFile(e.target.files[0])
        }

    }

    return (
        <div >
            <img src={photos.large||userPhoto}  className = {styles.img}/>
            <div className={styles.imgButton}>
                <input type="file" onChange={(e) => { loadImage(e) }} id='hidden' />
               { showEditButtons&&<label htmlFor="hidden">Update image</label>}
            </div>

        </div>
    )
}


export default UserImage