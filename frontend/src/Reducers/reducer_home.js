import { userConstants } from '../constants';

//Reducer listening to different action types
export function HomeReducer(state = {}, action) {
  switch (action.type) {
    case userConstants.DO_APPLICANT_LOGIN:
      return action.payload;
    case userConstants.DO_APPLICANT_SIGNUP:
      return action.payload;
    case userConstants.DO_APPLICANT_PROFILE_FETCH:
      return action.payload;
    case userConstants.DO_APPLICANT_PROFILE_SAVE:
      return action.payload;
    default:
      return state;
  }
}