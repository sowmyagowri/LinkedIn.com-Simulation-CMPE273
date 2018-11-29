import axios from "axios";
import { userConstants } from '../constants';
import URI from '../constants/URI';

//target action for Save a Job Request 
export function saveajob(data, tokenFromStorage) {
  console.log("inside Send Connection Request action")
  var config = {
    headers: {'Authorization': tokenFromStorage,
              'Content-Type': 'application/json',
              withCredentials : true
    }
  };
  axios.defaults.withCredentials = true;
  const response =  axios.post(URI.ROOT_URL + '/save_job/', data, config);
  console.log("Response", response);
  return {
    type: userConstants.SAVE_JOB,
    payload: response
  };  
}
