import { IAction } from "@Interfaces/common";
import ActionType from "./action-type";
import { fromJS } from "immutable";

const initialState = fromJS({
  type: null,
  payload: null,
  isLoading: false,
  error: null,
});
export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case ActionType.FETCH_QUESTION_GROUP_START:
    case ActionType.FETCH_QUESTION_CATEGORIES_START:
    case ActionType.FETCH_QUESTION_LIST_START:
    case ActionType.FETCH_EXAM_LIST_START:
    case ActionType.FETCH_EXAM_GROUPS_START:
      return state
        .set("type", action.type)
        .set("isLoading", true)
        .set("payload", null);
    case ActionType.FETCH_QUESTION_GROUP_SUCCESS:
    case ActionType.FETCH_QUESTION_CATEGORIES_SUCCESS:
    case ActionType.FETCH_QUESTION_LIST_SUCCESS:
    case ActionType.FETCH_EXAM_LIST_SUCCESS:
    case ActionType.FETCH_EXAM_GROUPS_SUCCESS:
      return state
        .set("type", action.type)
        .set("payload", action?.payload)
        .set("isLoading", false)
        .set("error", null);
    case ActionType.FETCH_QUESTION_GROUP_FAIL:
    case ActionType.FETCH_QUESTION_CATEGORIES_FAIL:
    case ActionType.FETCH_QUESTION_LIST_FAIL:
    case ActionType.FETCH_EXAM_LIST_FAIL:
    case ActionType.FETCH_EXAM_GROUPS_FAIL:
      return state
        .set("type", action.type)
        .set("isLoading", false)
        .set("error", action?.error);
    default:
      return state;
  }
};
