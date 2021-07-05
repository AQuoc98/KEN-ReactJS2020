import ActionType from "./action-type";
import { ILoginState, ILoginCredentials, IRegisterCredentials } from "./types";
import { userApi } from "./api";
//Special :
import { notificationAction } from "@Reduxs/Notification/action";
import ActionTypeRefreshData from "@Reduxs/RefreshData/action-type";
import { refreshDataAction } from "@Reduxs/RefreshData/action";

import typesNotification from "@Reduxs/Notification/const";
export const changeProfileStart = () => ({
  type: ActionType.CHANGE_PROFILE_START,
  payload: null,
  error: null,
});
export const changeProfileSuccess = (result: any) => ({
  type: ActionType.CHANGE_PROFILE_SUCCESS,
  payload: result,
  error: null,
});
export const changeProfileFail = (error: Error) => ({
  type: ActionType.CHANGE_PROFILE_FAIL,
  payload: null,
  error: error,
});

export const changeProfileAction = (dataProfile: any,uid:any) => {
  return async (dispatch: any) => {
    //Start
    dispatch(changeProfileStart());
    try {
      const result = await userApi.changeProfile(dataProfile,uid);
      //Success
      dispatch(changeProfileSuccess(result));
      dispatch(notificationAction({
        isNotification:true,
        typeNotification:typesNotification.SUCCESS as "success",
        message:"Thành Công",
        description:"Thay đổi thông tin thành công"

      }))
      dispatch(
        refreshDataAction({
          type: ActionTypeRefreshData?.CHANGE_PROFILE_SUCCESS,
          time: Date.now().toString(),
        })
      );

    } catch (Error) {
      //FAIL
      dispatch(changeProfileFail(Error));
      dispatch(
        notificationAction({
          isNotification: true,
          typeNotification: typesNotification.ERROR as "error",
          message: "Lỗi",
          description: Error?.response?.data?.message||"Có Lỗi Xảy Ra",
        })
      );
    }
  };
};


export const postImageAction = (imageFile: any):any => {
  return async (dispatch: any) => {
    //Start
    // dispatch(changeProfileStart());
    try {
      const result:any = await userApi.postImage(imageFile);
      return result
      //Success
      // dispatch(changeProfileSuccess(result));
      // dispatch(notificationAction({
      //   isNotification:true,
      //   typeNotification:typesNotification.SUCCESS as "success",
      //   message:"Thành Công",
      //   description:"Thay đổi thông tin thành công"

      // }))
    } catch (Error) {
      //FAIL
      // dispatch(changeProfileFail(Error));
      dispatch(
        notificationAction({
          isNotification: true,
          typeNotification: typesNotification.ERROR as "error",
          message: "Lỗi",
          description: Error?.response?.data?.message||"Có Lỗi Xảy Ra",
        })
      );
    }
  };
};
