//Special :
import { notificationAction } from "@Reduxs/Notification/action";
import typesNotification from "@Reduxs/Notification/const";
import { refreshDataAction } from "@Reduxs/RefreshData/action";
import ActionTypeRefreshData from "@Reduxs/RefreshData/action-type";
import ActionType from "./action-type";
import { apiModal } from "./api";


export const fetchExamCategoriesStart = () => ({
  type: ActionType.FETCH_EXAM_CATEGORIES_START,
  payload: null,
  error: null,
});
export const fetchExamCategoriesSuccess = (result: any) => ({
  type: ActionType.FETCH_EXAM_CATEGORIES_SUCCESS,
  payload: result,
  error: null,
});
export const fetchExamCategoriesFail = (error: Error) => ({
  type: ActionType.FETCH_EXAM_CATEGORIES_FAIL,
  payload: null,
  error: error,
});
export const fetchExamListStart = () => ({
  type: ActionType.FETCH_EXAM_LIST_START,
  payload: null,
  error: null,
});
export const fetchExamListSuccess = (result: any) => ({
  type: ActionType.FETCH_EXAM_LIST_SUCCESS,
  payload: result,
  error: null,
});
export const fetchExamListFail = (error: Error) => ({
  type: ActionType.FETCH_EXAM_LIST_FAIL,
  payload: null,
  error: error,
});


//FETCH

export const fetchExamCategoriesAction = (params: any) => {
  return async (dispatch: any) => {
    //Start
    dispatch(fetchExamCategoriesStart());
    try {
      const result = await apiModal.fetchExamCategories(params);
      //Success
      dispatch(fetchExamCategoriesSuccess(result));
      return result;
    } catch (Error) {
      //FAIL
      dispatch(fetchExamCategoriesFail(Error));
      dispatch(
        notificationAction({
          isNotification: true,
          typeNotification: typesNotification.ERROR as "error",
          message: "Lỗi",
          description: "Get dữ liệu  thất bại",
        })
      );
    }
  };
};

export const fetchExamListAction = (params: any) => {
  return async (dispatch: any) => {
    //Start
    dispatch(fetchExamListStart());
    try {
      const result = await apiModal.fetchExamList(params);
      //Success
      dispatch(fetchExamListSuccess(result));
      return result;
    } catch (Error) {
      //FAIL
      dispatch(fetchExamListFail(Error));
      dispatch(
        notificationAction({
          isNotification: true,
          typeNotification: typesNotification.ERROR as "error",
          message: "Lỗi",
          description: "Get dữ liệu  thất bại",
        })
      );
    }
  };
};

//ADD

export const addExamCategoryAction = (
  submitData: any,
  callback: Function
) => {
  return async (dispatch: any) => {
    try {
      const result = await apiModal.addExamCategory(submitData);
      //Success
      dispatch(
        notificationAction({
          isNotification: true,
          typeNotification: typesNotification.SUCCESS as "success",
          message: "Thành công",
          description: "Thêm danh mục câu hỏi thành công",
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
      dispatch(
        notificationAction({
          isNotification: true,
          typeNotification: typesNotification.ERROR as "error",
          message: "Lỗi",
          description: "Thêm danh mục câu hỏi thất bại",
        })
      );
    }
  };
};

export const addExamAction = (submitData: any, callback: Function) => {
  return async (dispatch: any) => {
    try {
      const result = await apiModal.addExam(submitData);
      //Success
      dispatch(
        notificationAction({
          isNotification: true,
          typeNotification: typesNotification.SUCCESS as "success",
          message: "Thành công",
          description: "Thêm  câu hỏi thành công",
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
      dispatch(
        notificationAction({
          isNotification: true,
          typeNotification: typesNotification.ERROR as "error",
          message: "Lỗi",
          description: "Thêm  câu hỏi thất bại",
        })
      );
    }
  };
};
//Delete
export const deleteExamCategoryAction = (id: any, callback: Function) => {
  return async (dispatch: any) => {
    try {
      const result = await apiModal.deleteExamCategory(id);
      //Success
      dispatch(
        notificationAction({
          isNotification: true,
          typeNotification: typesNotification.SUCCESS as "success",
          message: "Thành công",
          description: "Xóa danh mục câu hỏi thành công",
        })
      );
      dispatch(
        refreshDataAction({
          type: ActionTypeRefreshData?.DELETE_EXAM_CATEGORY_REFRESH,
          time: Date.now().toString(),
        })
      );
      callback();
    } catch (Error) {
      console.log(Error);
      dispatch(
        notificationAction({
          isNotification: true,
          typeNotification: typesNotification.ERROR as "error",
          message: "Lỗi",
          description: "Thêm danh mục câu hỏi thất bại",
        })
      );
    }
  };
};
