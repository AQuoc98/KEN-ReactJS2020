import { Api } from "@Configs/api/api";
import apiConfig from "@Configs/api/api.config";
import storeConfig from "@Reduxs/store";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_FETCH_ACCOUNT, API_FETCH_ENTERPRISE_ACCOUNTS } from "./endpoint";
import { ILoginState } from "./types";





const { store } = storeConfig();




class UserApi extends Api {
    public constructor (config: AxiosRequestConfig) {

        super(config);
        this.fetchAccount = this.fetchAccount.bind(this);
    }

    /**
     *
     * @param {object} credentials - user's identifications.
     * @param {string} credentials.email - user's email.
     * @param {string} credentials.password - user's password.
     * @returns {Promise<UserState>} userState - user information,
     */

    
    public fetchAccount (token: string,uid:string): Promise<any > {
        return this.get<ILoginState>(API_FETCH_ACCOUNT,{
            headers:{
                'Authorization': `Bearer ${token}`,
                "x-uid":uid
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

    public fetchEnterpriseAccount(limit: any, page: any): Promise<any> {

        return this.get<number>(
          API_FETCH_ENTERPRISE_ACCOUNTS,
          {
            headers: {
            },
            params:{
              limit:limit,
              page:page
            }
          }
        );
      }
}

export const userApi = new UserApi(apiConfig);