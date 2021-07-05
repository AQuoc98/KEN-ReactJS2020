import { newsApi } from "./api";
//Special :
import { notificationAction } from "@Reduxs/Notification/action";
import typesNotification from "@Reduxs/Notification/const";
export const postImageAction = (imageFile: any):any => {
  return async (dispatch: any) => {
    //Start
    // dispatch(changeProfileStart());
    try {
      const result:any = await newsApi.postImage(imageFile);
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
