import { Api } from "@Configs/api/api";
import apiConfig from "@Configs/api/api.config";
import { AxiosRequestConfig } from "axios";
import {
  API_POST_IMAGE
} from "./endpoint";

class NewsApi extends Api {
  public constructor(config: AxiosRequestConfig) {
    super(config);
    this.postImage     = this.postImage.bind(this);
  }

  public postImage(imageFile: any): Promise<any> {
    
    return this.post<any>(API_POST_IMAGE, imageFile, {
      headers: {
      },
    });
  }
}
 
export const newsApi = new NewsApi(apiConfig);
