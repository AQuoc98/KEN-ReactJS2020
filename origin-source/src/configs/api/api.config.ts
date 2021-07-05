import { PathLike } from "fs";
import * as qs from "qs";
const REACT_APP_BASE_URL=process.env.REACT_APP_BASE_URL;

let  apiConfig:any = {
    returnRejectedPromiseOnError: true,
    withCredentials: true,
    timeout: 5000,
    baseURL:REACT_APP_BASE_URL,
    headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            "Content-Type": "application/json",
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'x-context': 'quiz-app',         
    },
    paramsSerializer: (params: PathLike) => qs.stringify(params, { indices: false }),
}


export default apiConfig
