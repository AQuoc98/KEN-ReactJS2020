//Special :
import { notificationAction } from "@Reduxs/Notification/action";
import typesNotification from "@Reduxs/Notification/const";
import { refreshDataAction } from "@Reduxs/RefreshData/action";
import ActionTypeRefreshData from "@Reduxs/RefreshData/action-type";
import ActionType from "./action-type";
import { apiModal } from "./api";

export const fetchQuestionGroupStart = () => ({
  type: ActionType.FETCH_QUESTION_GROUP_START,
  payload: null,
  error: null,
});
export const fetchQuestionGroupSuccess = (result: any) => ({
  type: ActionType.FETCH_QUESTION_GROUP_SUCCESS,
  payload: result,
  error: null,
});
export const fetchQuestionGroupFail = (error: Error) => ({
  type: ActionType.FETCH_QUESTION_GROUP_FAIL,
  payload: null,
  error: error,
});
export const fetchQuestionListStart = () => ({
  type: ActionType.FETCH_QUESTION_LIST_START,
  payload: null,
  error: null,
});
export const fetchQuestionListSuccess = (result: any) => ({
  type: ActionType.FETCH_QUESTION_LIST_SUCCESS,
  payload: result,
  error: null,
});
export const fetchQuestionListFail = (error: Error) => ({
  type: ActionType.FETCH_QUESTION_LIST_FAIL,
  payload: null,
  error: error,
});
export const fetchQuestionCategoriesStart = () => ({
  type: ActionType.FETCH_QUESTION_CATEGORIES_START,
  payload: null,
  error: null,
});
export const fetchQuestionCategoriesSuccess = (result: any) => ({
  type: ActionType.FETCH_QUESTION_CATEGORIES_SUCCESS,
  payload: result,
  error: null,
});
export const fetchQuestionCategoriesFail = (error: Error) => ({
  type: ActionType.FETCH_QUESTION_CATEGORIES_FAIL,
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
export const fetchExamGroupsStart = () => ({
  type: ActionType.FETCH_EXAM_GROUPS_START,
  payload: null,
  error: null,
});
export const fetchExamGroupsSuccess = (result: any) => ({
  type: ActionType.FETCH_EXAM_GROUPS_SUCCESS,
  payload: result,
  error: null,
});
export const fetchExamGroupsFail = (error: Error) => ({
  type: ActionType.FETCH_EXAM_GROUPS_FAIL,
  payload: null,
  error: error,
});

//FETCH

export const fetchQuestionGroupAction = (params: any) => {
  return async (dispatch: any) => {
    //Start
    dispatch(fetchQuestionGroupStart());
    try {
      const result = await apiModal.fetchQuestionGroup(params);
      //Success
      dispatch(fetchQuestionGroupSuccess(result));
      return result;
    } catch (Error) {
      //FAIL
      dispatch(fetchQuestionGroupFail(Error));
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
export const fetchQuestionCategoriesAction = (params: any) => {
  return async (dispatch: any) => {
    //Start
    dispatch(fetchQuestionCategoriesStart());
    try {
      const result = await apiModal.fetchQuestionCategories(params);
      //Success
      dispatch(fetchQuestionCategoriesSuccess(result));
      return result;
    } catch (Error) {
      //FAIL
      dispatch(fetchQuestionCategoriesFail(Error));
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

export const fetchQuestionListAction = (params: any) => {
  return async (dispatch: any) => {
    //Start
    dispatch(fetchQuestionListStart());
    try {
      const result = await apiModal.fetchQuestionList(params);
      //Success
      dispatch(fetchQuestionListSuccess(result));
      return result;
    } catch (Error) {
      //FAIL
      dispatch(fetchQuestionListFail(Error));
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
export const fetchExamGroupsAction = (params: any) => {
  return async (dispatch: any) => {
    //Start
    dispatch(fetchExamGroupsStart());
    try {
      const result = await apiModal.fetchExamGroups(params);
      //Success
      dispatch(fetchExamGroupsSuccess(result));
      return result;
    } catch (Error) {
      //FAIL
      dispatch(fetchExamGroupsFail(Error));
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
export const fetchMemberInGroupAction = (params: any,selectedGroup:any) => {
  return async (dispatch: any) => {
    //Start
    try {
      const result = await apiModal.fetchMembersInGroup(params,selectedGroup);
      //Success
      return result;
    } catch (Error) {
      //FAIL
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

export const addQuestionGroupAction = (submitData: any, callback: Function) => {
  return async (dispatch: any) => {
    try {
      const result = await apiModal.addQuestionGroup(submitData);
      //Success
      dispatch(
        notificationAction({
          isNotification: true,
          typeNotification: typesNotification.SUCCESS as "success",
          message: "Thành công",
          description: "Thêm nhóm câu hỏi thành công",
        })
      );
      dispatch(
        refreshDataAction({
          type: ActionTypeRefreshData?.ADD_QUESTION_GROUP_REFRESH,
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
          description: "Thêm nhóm câu hỏi thất bại",
        })
      );
    }
  };
};

export const addExamGroupAction = (submitData: any, callback: Function) => {
  return async (dispatch: any) => {
    try {
      const result = await apiModal.addExamGroup(submitData);
      //Success
      dispatch(
        notificationAction({
          isNotification: true,
          typeNotification: typesNotification.SUCCESS as "success",
          message: "Thành công",
          description: "Thêm nhóm thi thành công",
        })
      );
      dispatch(
        refreshDataAction({
          type: ActionTypeRefreshData?.ADD_EXAM_GROUP_REFRESH,
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
          description: "Thêm nhóm thi thất bại",
        })
      );
    }
  };
};

export const addQuestionCategoryAction = (
  submitData: any,
  callback: Function
) => {
  return async (dispatch: any) => {
    try {
      const result = await apiModal.addQuestionCategory(submitData);
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
          type: ActionTypeRefreshData?.ADD_QUESTION_CATEGORY_REFRESH,
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
          description: "Thêm danh mục bài thi thành công",
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
          description: "Thêm danh mục bài thi thất bại",
        })
      );
    }
  };
};

export const addQuestionAction = (submitData: any, callback: Function) => {
  return async (dispatch: any) => {
    try {
      const result = await apiModal.addQuestion(submitData);
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
          type: ActionTypeRefreshData?.ADD_QUESTION_REFRESH,
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
export const addMemberToGroupAction = (submitData: any,selectedGroup:any, callback: Function) => {
  return async (dispatch: any) => {
    try {
      const result = await apiModal.addMemberToGroup(submitData,selectedGroup);
      //Success
      dispatch(
        notificationAction({
          isNotification: true,
          typeNotification: typesNotification.SUCCESS as "success",
          message: "Thành công",
          description: "Thêm  học viên thành công",
        })
      );
      dispatch(
        refreshDataAction({
          type: ActionTypeRefreshData?.ADD_MEMBER_TO_GROUP_REFRESH,
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
          description: "Thêm học viên thất bại",
        })
      );
    }
  };
};

//Delete
export const deleteQuestionCategoryAction = (id: any, callback: Function) => {
  return async (dispatch: any) => {
    try {
      const result = await apiModal.deleteQuestionCategory(id);
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
          type: ActionTypeRefreshData?.DELETE_QUESTION_CATEGORY_REFRESH,
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


//GET

export const getQuestionCategoriesAction = (params: any) => {
  return async (dispatch: any) => {
    //Start
    try {
      const result = await apiModal.fetchQuestionCategories(params);
      //Success
      return result;
    } catch (Error) {
      //FAIL
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

export const getQuestionGroupAction = (params: any) => {
  return async (dispatch: any) => {
    //Start
    try {
      const result = await apiModal.fetchQuestionGroup(params);
      //Success
      return result;
    } catch (Error) {
      //FAIL
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