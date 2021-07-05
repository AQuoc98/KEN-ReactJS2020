import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ILoginState } from "./types";
import apiConfig from "@Configs/api/api.config"
import { Api } from "@Configs/api/api";
import storeConfig from "../../reduxs/store";




import {API_CHANGE_PROFILE,API_POST_IMAGE} from "./endpoint"

const { store } = storeConfig();

class ChangeProfileApi extends Api {
    public constructor (config: AxiosRequestConfig) {
        super(config);
        this.changeProfile= this.changeProfile.bind(this);
    }

    /**
     *
     * @param {object} credentials - user's identifications.
     * @param {string} credentials.email - user's email.
     * @param {string} credentials.password - user's password.
     * @returns {Promise<UserState>} userState - user information,
     */
    public changeProfile (dataProfile: any,uid:any): Promise<any > {       
        return this.patch<any>(API_CHANGE_PROFILE,JSON.stringify(dataProfile),{
            headers:{
                "x-uid":uid,
                     'pass-business-id':true

            }
        })
            .then((response: AxiosResponse<any>) => {
                const { data } = response;
                const state: ILoginState = data
                return state;
            })
            .catch((error: AxiosError) => {
                console.log(error?.response);
                throw error;
            });
    }
    public postImage (imageFile: any): Promise<any > {
 
        return this.post<any>(API_POST_IMAGE,imageFile,{
            headers:{
                // 'Authorization': `Bearer ${token}`
            }
        })
            .then((response: AxiosResponse<any>) => {
                const { data } = response;
                const state: ILoginState = data
                return state;
            })
            .catch((error: AxiosError) => {
                throw error;
            });
    }
}

export const userApi = new ChangeProfileApi(apiConfig);