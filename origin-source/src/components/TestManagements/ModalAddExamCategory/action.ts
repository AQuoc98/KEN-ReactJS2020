//Special :
import { notificationAction } from "@Reduxs/Notification/action";
import typesNotification from "@Reduxs/Notification/const";
import { refreshDataAction } from "@Reduxs/RefreshData/action";
import ActionTypeRefreshData from "@Reduxs/RefreshData/action-type";
import { newsApi } from "./api";

export const addUserAction = (submitData: any, callback: Function) => {
  return async (dispatch: any) => {
    // Start
    //Success
    try {


      const result = await newsApi.addUser(submitData);

      const responseData=result?.data
      dispatch(
        notificationAction({
          isNotification: true,
          typeNotification: typesNotification.SUCCESS as "success",
          message: "Thành Công",
          description:`Thêm  thành công ${responseData?.result?.success} ,thất bại  ${responseData?.result?.fail} `,
        })
      );
      dispatch(
        refreshDataAction({
          type: ActionTypeRefreshData?.ADD_EXAM_CATEGORY_REFRESH,
          time: Date.now().toString(),
        })
      );

      callback();
    } catch (Error) {

      console.log(Error)
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


