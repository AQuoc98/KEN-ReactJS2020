import { Api } from "@Configs/api/api";
import apiConfig from "@Configs/api/api.config";
import { AxiosRequestConfig } from "axios";
import storeConfig from "../../../reduxs/store";
import {
  API_ADD_USER
} from "./endpoint";

const { store } = storeConfig();

class NewsApi extends Api {
  public constructor(config: AxiosRequestConfig) {
    super(config);
    this.addUser = this.addUser.bind(this);
  }



  public addUser(data:any): Promise<any> {
   
    return this.post<number>(API_ADD_USER, JSON.stringify(data),{
      headers: {
       
      },
      params:{
      }
     
    })
  }
}

export const newsApi = new NewsApi(apiConfig);
