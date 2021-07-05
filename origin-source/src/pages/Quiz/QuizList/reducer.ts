import { IAction } from "@Interfaces/common";
import { fromJS } from "immutable";
import ActionType from "./action-type";

const initialState = fromJS({
  type: null,
  payload: null,
  isLoading: false,
  error: null,
});
export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case ActionType.FETCH_USERS_START:
      return state.set("type", action.type).set("isLoading", true);
    case ActionType.FETCH_USERS_SUCCESS:
      return state
        .set("type", action.type)
        .set("payload", action?.payload)
        .set("isLoading", false)
        .set("error", null);
    case ActionType.FETCH_USERS_FAIL:
      return state
        .set("type", action.type)
        .set("isLoading", false)
        .set("error", action?.error);
    default:
      return state;
  }
};
