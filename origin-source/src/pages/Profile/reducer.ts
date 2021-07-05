import {IAction } from  "@Interfaces/common";
import ActionType from "./action-type";
import { fromJS } from 'immutable';

const initialState = fromJS({
  type:null,
  payload: null,
  isLoading:false,
  error:null,
});
export default (state = initialState , action: IAction) => {
  switch (action.type) {
    case ActionType.CHANGE_PROFILE_START:
      return state
      .set('type', action.type)
      .set('isLoading', true)
    case ActionType.CHANGE_PROFILE_SUCCESS:
      return state
      .set('type', action.type)
      .set('payload', action?.payload)
      .set('isLoading', false)
      .set('error',null)
      case ActionType.CHANGE_PROFILE_FAIL:
        return state
        .set('type', action.type)
        .set('isLoading', false)
        .set('error',action?.error)
    default:
      return state;
  }
};