import ActionType from './action-type';
import {ILoginState,ILoginCredentials,IRegisterCredentials} from "./types"
import {userApi} from "./api";
//Special : 
import {notificationAction} from "@Reduxs/Notification/action"
import typesNotification from "@Reduxs/Notification/const"
export const fetchAccountStart = () => ({
  type: ActionType.FETCH_ACCOUNT_START,
  payload:null,
  error:null
});
export const fetchAccountSuccess = (result:any) => ({
  type: ActionType.FETCH_ACCOUNT_SUCCESS,
  payload:result,
  error:null
});
export const fetchAccountFail = (error:Error) => ({
  type: ActionType.FETCH_ACCOUNT_FAIL,
  payload:null,
  error:error
});



export const fetchAccountAction=(token:string,uid:string)=>{
  return async (dispatch:any)=>{
    //Start
    dispatch(fetchAccountStart());
    try{
      const result=await userApi.fetchAccount(token,uid);
       //Success
      dispatch(fetchAccountSuccess(result));
     
    }catch(Error){
      //FAIL
      dispatch(fetchAccountFail(Error));
      dispatch(notificationAction({
        isNotification:true,
        typeNotification:typesNotification.ERROR as "error",
        message:"Lỗi",
        description:"Get dữ liệu account thất bại"

      }))
     
    }
  }
}

export const fetchEnterpriseAccountAction = (limit:any,page:any) => {
  return async (dispatch: any) => {
    // Start
    //Success
    try {
      const result = await userApi.fetchEnterpriseAccount(limit,page);
      const dataList = result?.data;
      return dataList;
    } catch (Error) {
      //FAIL
      dispatch(
        notificationAction({
          isNotification: true,
          typeNotification: typesNotification.ERROR as "error",
          message: "Lỗi",
          description: Error?.response?.data?.message || "Có Lỗi Xảy Ra",
        })
      );
    }
  };
};
