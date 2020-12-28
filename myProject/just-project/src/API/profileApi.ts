import { AxiosResponse } from 'axios';
import { instanse, SetStatusTextResponseType, SetUserDataResponseType, SetImageResponseType } from './api';
import { ProfileType } from "../Components/commons/CommonsFileTypes/ProfileType";

export const profileApi = {
    getProfile(userId: number | null) {
        return instanse.get(`profile/` + userId)
            .then((response: AxiosResponse<ProfileType>) => {
                return response.data;
            });
    },
    getStatus(userId: number) {
        return instanse.get(`profile/status/` + userId)
            .then((response: AxiosResponse<string>) => {
                return response.data;
            });
    },
    setStatusText(status: string) {
        return instanse.put(`profile/status/`, { status })
            .then((response: AxiosResponse<SetStatusTextResponseType>) => {
                return response.data;
            });
    },
    setUserData(data: ProfileType) {
        return instanse.put(`profile/`, data)
            .then((response: AxiosResponse<SetUserDataResponseType>) => {
                return response.data;
            });
    },
    setImage(file: File) {
        const photo = new FormData();
        photo.append('image', file);
        return instanse.put(`profile/photo/`, photo, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response: AxiosResponse<SetImageResponseType>) => {
                return response.data;
            });
    }
};


