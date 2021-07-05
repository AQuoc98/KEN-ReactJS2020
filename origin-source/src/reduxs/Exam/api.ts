import { Api } from "@Configs/api/api";
import apiConfig from "@Configs/api/api.config";
import { cleanQueryParams } from "@Helpers/tools";
import storeConfig from "@Reduxs/store";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  API_FETCH_EXAM_LIST, API_FETCH_EXAM_CATEGORIES_TREE, 
  API_FETCH_EXAM_CATEGORIES
} from "./endpoint";

const { store } = storeConfig();
class ApiModal extends Api {
  public constructor(config: AxiosRequestConfig) {
    super(config);
    this.fetchExamList = this.fetchExamList.bind(this);
    this.fetchExamCategories = this.fetchExamCategories.bind(this);
  }

  //FETCH

  public fetchExamList(params:any): Promise<any> {
    return this.get<any>(API_FETCH_EXAM_LIST, {
      headers: {},
      params:cleanQueryParams(params)
    })
      .then((response: AxiosResponse<any>) => {
        const { data } = response;
        const state: any = data;
        return state;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }
  public fetchExamCategories(params:any): Promise<any> {
    return this.get<any>(API_FETCH_EXAM_CATEGORIES_TREE, {
      headers: {},
      params:cleanQueryParams(params)
    })
      .then((response: AxiosResponse<any>) => {
        const { data } = response;
        const state: any = data;
        return state;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }



  //ADD

  public addExamCategory(submitData: any): Promise<any> {
    return this.post<any>(
      API_FETCH_EXAM_CATEGORIES,
      JSON.stringify(submitData),
      {
        headers: {},
      }
    )
      .then((response: AxiosResponse<any>) => {
        const { data } = response;
        const state: any = data;
        return state;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }
  
  public addExam(submitData: any): Promise<any> {
    return this.post<any>(
      API_FETCH_EXAM_LIST,
      JSON.stringify(submitData),
      {
        headers: {},
      }
    )
      .then((response: AxiosResponse<any>) => {
        const { data } = response;
        const state: any = data;
        return state;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }


  //Delete
  public deleteExamCategory(id: any): Promise<any> {
    return this.delete<any>(
      API_FETCH_EXAM_CATEGORIES+`/${id}`,
      {
        headers: {},
      }
    )
      .then((response: AxiosResponse<any>) => {
        const { data } = response;
        const state: any = data;
        return state;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }
  

}

export const apiModal = new ApiModal(apiConfig);
