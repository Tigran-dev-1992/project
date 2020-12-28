import { AxiosResponse } from 'axios';
import { instanse, MainResponseType } from './api';





type AuthorizedDataType = {
    id: number
    email: string
    login: string
}
type IsAuthorizedType = MainResponseType<AuthorizedDataType>


type LoginDataType = {
    userId: number
}
type LoginResponseType = MainResponseType<LoginDataType>



type CaptchaType = {
    url: string
}


export const loginApi = {
    login({ email, password, rememberMe = false, captcha }: { email: string, password: string, rememberMe: boolean, captcha: string }) {
        let data = { email, password, rememberMe, captcha };
        return instanse.post(`auth/login/`, data)
            .then((response: AxiosResponse<LoginResponseType>) => {
                return response.data;
            });
    },
    logout() {
        return instanse.delete(`auth/login`)
            .then((response: AxiosResponse<MainResponseType>) => {
                return response.data;
            });
    },
    isAuthorized() {
        return instanse.get(`auth/me`)
            .then((response: AxiosResponse<IsAuthorizedType>) => {
                return response.data;
            });
    },
    getCaptcha() {
        return instanse.get('/security/get-captcha-url')
            .then((response: AxiosResponse<CaptchaType>) => {
                return response.data
            })
    }
};
