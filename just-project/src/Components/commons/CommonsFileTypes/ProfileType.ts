import { PhotosType } from '../../../redux/user-reducer';

export type ProfileType = {
    aboutMe: string;
    userId: number;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    contacts: ContactsType
    photos: PhotosType;

};


export type ContactsType= {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
}