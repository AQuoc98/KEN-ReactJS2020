import ActionType from './action-type';
import {ILoginState,ILoginCredentials,IRegisterCredentials} from "./types"
import {userApi} from "./api";
//Special : 
import {notificationAction} from "@Reduxs/Notification/action"
import typesNotification from "@Reduxs/Notification/const"

export const forgotPasswordAction=(token:any,submitData:any)=>{
  return async (dispatch:any)=>{
    //Start
    try{
      const result=await userApi.forgotPassword(token,submitData);
       //Success
      dispatch(notificationAction({
        isNotification:true,
        typeNotification:typesNotification.SUCCESS as "success",
        message:"Thành Công",
        description:"Kiểm tra email để thay đổi mật khẩu"

      }))

     
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
