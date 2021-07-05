import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ILoginState, ILoginCredentials, IRegisterCredentials } from "./types";
import apiConfig from "@Configs/api/api.config";
import { Api } from "@Configs/api/api";
import tools from "@Helpers/tools";

import { API_RESET_PASSWORD } from "./endpoint";

class UserApi extends Api {
  public constructor(config: AxiosRequestConfig) {
    super(config);
    this.resetPassword = this.resetPassword.bind(this);
  }

  /**
   *
   * @param {object} credentials - user's identifications.
   * @param {string} credentials.email - user's email.
   * @param {string} credentials.password - user's password.
   * @returns {Promise<UserState>} userState - user information,
   */
  public resetPassword(token: any, submitData: any): Promise<any> {
    return this.patch<ILoginState>(
      API_RESET_PASSWORD,
      JSON.stringify(submitData),
      {
        headers: {
          "x-recaptcha-token": token,
        },
      }
    )
      .then((response: AxiosResponse<ILoginState>) => {
        const { data } = response;
        const state: ILoginState = data;
        return state;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }
}

export const userApi = new UserApi(apiConfig);
