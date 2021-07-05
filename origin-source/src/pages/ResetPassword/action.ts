import ActionType from './action-type';
import {ILoginState,ILoginCredentials,IRegisterCredentials} from "./types"
import {userApi} from "./api";
//Special : 
import {notificationAction} from "@Reduxs/Notification/action"
import typesNotification from "@Reduxs/Notification/const"

export const resetPasswordAction=(token:any,submitData:any,callback:Function)=>{
  return async (dispatch:any)=>{
    //Start
    try{
      const result=await userApi.resetPassword(token,submitData);
       //Success
      dispatch(notificationAction({
        isNotification:true,
        typeNotification:typesNotification.SUCCESS as "success",
        message:"Thành Công",
        description:"Thay đổi mật khẩu thành công ! "

      }))
      callback();
     
    }catch(Error){
      //FAIL
      dispatch(notificationAction({
        isNotification:true,
        typeNotification:typesNotification.ERROR as "error",
        message:"Lỗi",
        description: Error?.response?.data?.message||"Có Lỗi Xảy Ra",

      }))
     
    }
  }
}
