import { AxiosResponse } from 'axios';
import { UserType } from '../redux/user-reducer';
import { instanse, MainResponseType } from './api';

type UserDataType = {
    items : Array<UserType>
    totalCount: number
    error : Array<string>
}
export const userApi = {
    getUsersData(count: number, page: number,term:string='',friend : boolean|null) {
        return instanse.get(`users?count=${count}&page=${page}&term=${term}&friend=${friend}`)
            .then((response:AxiosResponse<UserDataType>) => {
                return response.data
            })
    },
    follow(userId: number) {
        return instanse.post(`follow/${userId}`)
            .then((response: AxiosResponse<MainResponseType>) => {
                return response.data;
            });
    },
    unFollow(userId: number) {
        return instanse.delete(`follow/${userId}`)
            .then((response: AxiosResponse<MainResponseType>) => {
                return response.data;
            });
    }
};
