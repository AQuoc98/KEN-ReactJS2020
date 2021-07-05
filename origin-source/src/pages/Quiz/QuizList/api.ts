import { Api } from "@Configs/api/api";
import apiConfig from "@Configs/api/api.config";
import { AxiosRequestConfig } from "axios";
import storeConfig from "@Reduxs/store";
import { API_DELETE_USER, API_EDIT_ROLES_USER, API_FETCH_ROLES, API_FETCH_USERS } from "./endpoint";

const { store } = storeConfig();

class NewsApi extends Api {
  public constructor(config: AxiosRequestConfig) {
    super(config);
    this.deleteUser = this.deleteUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  public deleteUser(selectedUserID:any): Promise<any> {
    return this.delete<number>(API_DELETE_USER + `/${selectedUserID}`, {
      headers: {
      }
     
    })
  }
  public fetchUsers(params:any): Promise<any> {

    return this.get<number>(API_FETCH_USERS, {
      headers: {
      },
      params:{
        ...params
      }
     
    })
  }
  public fetchRoles(): Promise<any> {
  

    return this.get<number>(API_FETCH_ROLES, {
      headers: {

      },
      params:{
      }
     
    })
  }
  public changeRole(selectedUserID:any,selectedRole:any): Promise<any> {

    return this.patch<number>(API_EDIT_ROLES_USER+`/${selectedUserID}`,JSON.stringify({
      role:selectedRole
    }), {
      headers: {

      }
    })
  }
}
 
export const newsApi = new NewsApi(apiConfig);
