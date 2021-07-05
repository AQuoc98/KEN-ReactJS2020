import ActionType from './action-type';
import {ILoginState,ILoginCredentials,IRegisterCredentials} from "./types"
import {userApi} from "./api";
//Special : 
import {notificationAction} from "@Reduxs/Notification/action"
import typesNotification from "@Reduxs/Notification/const"
export const loginStart = () => ({
  type: ActionType.LOGIN_START,
  payload:null,
  error:null
});
export const loginSuccess = (result:ILoginState) => ({
  type: ActionType.LOGIN_SUCCESS,
  payload:result,
  error:null
});
export const loginFail = (error:Error) => ({
  type: ActionType.LOGIN_FAIL,
  payload:null,
  error:error
});

export const logoutStart = () => ({
  type: ActionType.LOGOUT_START,
  payload:null,
  error:null
});
export const logoutSuccess = (result:any) => ({
  type: ActionType.LOGOUT_SUCCESS,
  payload:result,
  error:null
});
export const logoutFail = (error:Error) => ({
  type: ActionType.LOGOUT_FAIL,
  payload:null,
  error:error
});
export const registerStart = () => ({
  type: ActionType.REGISTER_START,
  payload:null,
  error:null
});
export const registerSuccess = (result:any) => ({
  type: ActionType.REGISTER_SUCCESS,
  payload:result,
  error:null
});
export const registerFail = (error:Error) => ({
  type: ActionType.REGISTER_FAIL,
  payload:null,
  error:error
});

export const loginAction=(token:any,credentials:ILoginCredentials,callback:Function)=>{
  return async (dispatch:any)=>{
    //Start
    dispatch(loginStart());
    try{
      const result=await userApi.loginUser(token,credentials);
       //Success
      dispatch(loginSuccess(result));
      dispatch(notificationAction({
        isNotification:true,
        typeNotification:typesNotification.SUCCESS as "success",
        message:"Thành Công",
        description:"Đăng Nhập Thành Công"

      }))

      callback();
     
    }catch(Error){
      //FAIL
      dispatch(loginFail(Error));
      dispatch(notificationAction({
        isNotification:true,
        typeNotification:typesNotification.ERROR as "error",
        message:"Lỗi",
        description: Error?.response?.data?.message||"Có Lỗi Xảy Ra",

      }))
     
    }
  }
}



export const registerAction=(token:any,credentials:IRegisterCredentials,callback:Function)=>{
  return async (dispatch:any)=>{
    //Start
    dispatch(registerStart());
    try{
      const result=await userApi.registerUser(token,credentials);
       //Success
      dispatch(registerSuccess(result));
      dispatch(notificationAction({
        isNotification:true,
        typeNotification:typesNotification.SUCCESS as "success",
        message:"Thành Công",
        description:"Đăng ký Thành Công"

      }))

      callback();
     
    }catch(Error){
      //FAIL
      dispatch(registerFail(Error));
      dispatch(notificationAction({
        isNotification:true,
        typeNotification:typesNotification.ERROR as "error",
        message:"Lỗi",
        description: Error?.response?.data?.message||"Có lỗi xảy ra",

      }))
     
    }
  }
}

export const logoutAction=(callback:Function)=>{
  return async (dispatch:any)=>{
    //Start
    dispatch(logoutStart());
    try{
       //Success
    localStorage.removeItem('ENTERPRISE_KEY');
    localStorage.removeItem("ENTERPRISE_URL");

      dispatch(logoutSuccess(null));
      callback();
     
    }catch(Error){
      //FAIL
      dispatch(registerFail(Error));
     
    }
  }
}

