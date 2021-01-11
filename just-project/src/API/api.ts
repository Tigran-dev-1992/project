import axios from 'axios'
import { PhotosType } from '../redux/user-reducer'

export let instanse = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "6656f04f-8cb6-4cab-a1f6-1a937fec17c4"
    }
})

export enum ResultCodeType{
    Success = 0,
    Error = 1,
    CaptchaIsRecuired=10
}
export type MainResponseType<D={}> = {
    resultCode: ResultCodeType
    messages: Array<string>
    data: D
}




export type SetStatusTextResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
export type SetUserDataResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
export type SetImageResponseType = {
    fieldsErrors: Array<string>
    resultCode: number
    messages: Array<string>
    data: {
        photos: PhotosType
    }
}



