import { newsApi } from "./api";
//Special :
import { notificationAction } from "@Reduxs/Notification/action";
import typesNotification from "@Reduxs/Notification/const";
import ActionType from "./action-type";
import { refreshDataAction } from "@Reduxs/RefreshData/action";
import ActionTypeRefreshData from "@Reduxs/RefreshData/action-type";


export const fetchUsersStart = () => ({
  type: ActionType.FETCH_USERS_START,
  payload:null,
  error:null
  
});
export const fetchUsersSuccess = (result:any) => ({
  type: ActionType.FETCH_USERS_SUCCESS,
  payload:result,
  error:null
  
});
export const fetchUsersFail = (error:Error) => ({
  type: ActionType.FETCH_USERS_FAIL,
  payload:null,
  error:error
});
export const deleteUserAction = (selectedUserID:any,callback:Function) => {
  return async (dispatch: any) => {
    // Start

    //Success
    try {
      const result = await newsApi.deleteUser(selectedUserID);
      dispatch(
        notificationAction({
          isNotification: true,
          typeNotification: typesNotification.SUCCESS as "success",
          message: "Thành Công",
          description:"Xóa thành công",
        })
      );
      dispatch(
        refreshDataAction({
          type: ActionTypeRefreshData?.DELETE_USER_SUCCESS,
          time: Date.now().toString(),
        })
      );
      callback()
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


export const fetchUsersAction = (params:any) => {
  return async (dispatch: any) => {
    // Start
    dispatch(fetchUsersStart());

    //Success
    try {

      const result = await newsApi.fetchUsers(params);
      const dataList = result?.data;
      dispatch(fetchUsersSuccess(dataList));

    } catch (Error) {
      dispatch(fetchUsersFail(Error));

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


export const fetchRolesAction = () => {
  return async (dispatch: any) => {
    // Start
    //Success
    try {

      const result = await newsApi.fetchRoles();
      return result?.data;

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
export const changeRoleAction = (selectedUserID:any,selectedRole:any,callback:Function) => {
  return async (dispatch: any) => {
    //Success
    try {

      const result = await newsApi.changeRole(selectedUserID,selectedRole);
       dispatch(
        notificationAction({
          isNotification: true,
          typeNotification: typesNotification.SUCCESS as "success",
          message: "Thành Công",
          description:"Thay đổi thành công",
        })
      );
      dispatch(
        refreshDataAction({
          type: ActionTypeRefreshData?.CHANGE_ROLE_SUCCESS,
          time: Date.now().toString(),
        })
      );
      callback()
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