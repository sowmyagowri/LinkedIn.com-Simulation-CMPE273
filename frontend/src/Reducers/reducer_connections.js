import { userConstants } from '../constants';

//Reducer listening to different action types
export function ConnectionsReducer(state = {}, action) {
  switch (action.type) {
    case userConstants.MAKE_CONNECTION_REQUEST:
      return action.payload;
    case userConstants.GET_ALL_CONNECTIONS:
      return action.payload;
    default:
      return state;
  }
}