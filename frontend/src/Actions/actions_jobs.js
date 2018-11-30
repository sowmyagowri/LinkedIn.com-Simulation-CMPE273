import axios from "axios";
import { userConstants } from '../constants';
import URI from '../constants/URI';

//target action for Save a Job Request 
export function saveajob(data, tokenFromStorage) {
  console.log("inside Save a Job Request action")
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

//target action for Apply a Job Request 
export function applyjob(data, tokenFromStorage) {
  console.log("inside Apply a Job Request  action")
  var config = {
    headers: {'Authorization': tokenFromStorage,
              'Content-Type': 'application/json',
              withCredentials : true
    }
  };
  axios.defaults.withCredentials = true;
  const response =  axios.post(URI.ROOT_URL + '/apply_for_job/', data, config);
  console.log("Response", response);
  return {
    type: userConstants.APPLY_JOB,
    payload: response
  };  
}
  
//target action for Get all saved jobs Request 
export function getsavedjobs(applicantEmail, tokenFromStorage) {
  console.log("inside Get all saved jobs Request action")
  var config = {
    headers: {'Authorization': tokenFromStorage,
              'Content-Type': 'application/json',
              withCredentials : true
    }
  };
  axios.defaults.withCredentials = true;
  const response = axios.get(URI.ROOT_URL + '/get_all_saved_jobs/' , {
    params: {
      applicantEmail
    } , 
    ...config
  });
  console.log("Response", response);
  return {
    type: userConstants.GET_SAVEDJOBS,
    payload: response
  };  
}