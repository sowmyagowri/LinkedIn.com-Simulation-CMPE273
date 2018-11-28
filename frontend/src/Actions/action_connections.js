import axios from "axios";
import { userConstants } from '../constants';
import URI from '../constants/URI';

//target action for Send Connection Request 
export function makeconnections(data, tokenFromStorage) {
  console.log("inside Send Connection Request action")
  var config = {
    headers: {'Authorization': tokenFromStorage,
              'Content-Type': 'application/json',
              withCredentials : true
    }
  };
  axios.defaults.withCredentials = true;
  const response =  axios.post(URI.ROOT_URL + '/makeConnectionRequest/', data, config);
  console.log("Response", response);
  return {
    type: userConstants.MAKE_CONNECTION_REQUEST,
    payload: response
  };  
}
