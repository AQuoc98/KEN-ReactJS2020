import { Api } from "@Configs/api/api";
import apiConfig from "@Configs/api/api.config";
import { cleanQueryParams } from "@Helpers/tools";
import storeConfig from "@Reduxs/store";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { 
  API_FETCH_QUESTION_GROUP,
   API_FETCH_QUESTION_LIST,
   API_FETCH_QUESTION_CATEGORIES,
   API_FETCH_QUESTION_CATEGORIES_TREE,
   API_FETCH_EXAM_LIST,
   API_FETCH_EXAM_GROUPS,
   API_FETCH_MEMBER_IN_GROUP,
   API_FETCH_MEMBER_TO_GROUP,
   API_FETCH_EXAM_CATEGORIES,
  
  } from "./endpoint";

const { store } = storeConfig();
class ApiModal extends Api {
  public constructor(config: AxiosRequestConfig) {
    super(config);
    this.fetchQuestionGroup = this.fetchQuestionGroup.bind(this);
    this.fetchQuestionList = this.fetchQuestionList.bind(this);
    this.fetchQuestionCategories = this.fetchQuestionCategories.bind(this);
  }

  //FETCH
  public fetchQuestionGroup(params:any): Promise<any> {
    return this.get<any>(API_FETCH_QUESTION_GROUP, {
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
  public fetchQuestionList(params:any): Promise<any> {
    return this.get<any>(API_FETCH_QUESTION_LIST, {
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
  public fetchQuestionCategories(params:any): Promise<any> {
    return this.get<any>(API_FETCH_QUESTION_CATEGORIES_TREE, {
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
  public fetchExamGroups(params:any): Promise<any> {
    return this.get<any>(API_FETCH_EXAM_GROUPS, {
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

  public fetchMembersInGroup(params:any,selectGroup:any): Promise<any> {
    return this.get<any>(API_FETCH_MEMBER_IN_GROUP +`/${selectGroup}`+`/members`, {
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
  
  public addQuestionGroup(submitData: any): Promise<any> {
    return this.post<any>(
      API_FETCH_QUESTION_GROUP,
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

  public addQuestionCategory(submitData: any): Promise<any> {
    return this.post<any>(
      API_FETCH_QUESTION_CATEGORIES,
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
  public addExamGroup(submitData: any): Promise<any> {
    return this.post<any>(
      API_FETCH_EXAM_GROUPS,
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
  public addQuestion(submitData: any): Promise<any> {
    return this.post<any>(
      API_FETCH_QUESTION_LIST,
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
  public addMemberToGroup(submitData: any,selectGroup:any): Promise<any> {
    return this.post<any>(
      API_FETCH_MEMBER_IN_GROUP +`/${selectGroup}`+`/members`,
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
  public deleteQuestionCategory(id: any): Promise<any> {
    return this.delete<any>(
      API_FETCH_QUESTION_CATEGORIES+`/${id}`,
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
