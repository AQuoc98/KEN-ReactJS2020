import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import history from "@Configs/history"
import storeConfig from "../../reduxs/store";
const { store } = storeConfig();
export class Api {
  private api: AxiosInstance;

  public constructor(config: AxiosRequestConfig) {
    this.api = axios.create(config);

    // this middleware is been called right before the http request is made.
    this.api.interceptors.request.use((param: AxiosRequestConfig) => {
// console.log(param)
      const token = store
        ?.getState()
        ?.loginReducer?.get("payload")
        ?.get("result")
        ?.get("token");
      const uid = store
        ?.getState()
        ?.loginReducer?.get("payload")
        ?.get("result")
        ?.get("id");
      const businessID = localStorage.getItem("ENTERPRISE_KEY");
      let headersConfig = {};
      if (token) {
        headersConfig = {
          ...headersConfig,
          Authorization: `Bearer ${token}`,
        };
      }
      if (uid&&!param?.headers["account"]) {
        headersConfig = {
          ...headersConfig,
          "account": uid,
        };
      }
      // console.log(param);
      return {
        ...param,
        headers: {...param?.headers, ...headersConfig },
      };
    });

    // this middleware is been called right before the response is get it by the method that triggers the request
    this.api.interceptors.response.use((param: AxiosResponse) =>{ 
      return ({
      ...param,
    })},(error)=>{

      if(error?.response?.status==403){
        history.push("/");
        return ;
      }
       throw error;
    
    });
  }

  public getUri(config?: AxiosRequestConfig): string {
    return this.api.getUri(config);
  }

  public request<T, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.api.request(config);
  }

  public get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.get(url, config);
  }

  public delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.delete(url, config);
  }

  public head<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.head(url, config);
  }

  public post<T, R = AxiosResponse<T>>(
    url: string,
    data?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.post(url, data, config);
  }

  public put<T, R = AxiosResponse<T>>(
    url: string,
    data?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.put(url, data, config);
  }

  public patch<T, R = AxiosResponse<T>>(
    url: string,
    data?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.patch(url, data, config);
  }
}
