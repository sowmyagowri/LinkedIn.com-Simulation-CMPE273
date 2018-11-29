import { userConstants } from '../constants';

//Reducer listening to different action types
export function ApplicantJobsReducer(state = {}, action) {
  switch (action.type) {
    case userConstants.SAVE_JOB:
      return action.payload;
    default:
      return state;
  }
}