import ActionType from './action-type';
import {INotificationState} from "./types"
export const notificationStart = () => ({
  type: ActionType.NOTIFICATION_START,
  payload:null,
  error:null
  
});
export const notificationSuccess = (result:INotificationState) => ({
  type: ActionType.NOTIFICATION_SUCCESS,
  payload:result,
  error:null
  
});

export const notificationAction=(result:INotificationState)=>{
  return async (dispatch:any)=>{
    //Start
    dispatch(notificationStart());

    //Success
    dispatch(notificationSuccess(result));

  }
}


export const notificationResetAction=()=>{
  return async (dispatch:any)=>{
    //Start
    dispatch(notificationStart());

  }
}
