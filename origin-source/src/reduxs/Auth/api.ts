import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ILoginState, ILoginCredentials, IRegisterCredentials  } from "./types";
import apiConfig from "@Configs/api/api.config"
import { Api } from "@Configs/api/api";
import tools from "@Helpers/tools"





import {API_LOGIN,API_REGISTER} from "./endpoint"




class UserApi extends Api {
    public constructor (config: AxiosRequestConfig) {
        super(config);
        this.loginUser = this.loginUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    /**
     *
     * @param {object} credentials - user's identifications.
     * @param {string} credentials.email - user's email.
     * @param {string} credentials.password - user's password.
     * @returns {Promise<UserState>} userState - user information,
     */
    public loginUser (token:any,credentials: ILoginCredentials): Promise<any > {
        return this.post<ILoginState>(API_LOGIN, JSON.stringify({}),{
            headers:{
                'Authorization': `Basic ${tools?.encodeBase64(`${credentials.username}:${credentials.password}`)}`,
                'x-recaptcha-token':token
            }
        })
            .then((response: AxiosResponse<ILoginState>) => {
                const { data } = response;
                const state: ILoginState = data
                return state;
            })
            .catch((error: AxiosError) => {
                throw error;
            });
    } 
    public registerUser (token:any,credrentials: IRegisterCredentials): Promise<number> {
        return this.post<number>(API_REGISTER, JSON.stringify(credrentials),{
            headers:{
                'x-recaptcha-token':token
            }
        })
            .then((registered: AxiosResponse<number>) => {
                const { status } = registered;

                return status;
            })
            .catch((error: AxiosError) => {
                throw error;
            });
    }
}

export const userApi = new UserApi(apiConfig);