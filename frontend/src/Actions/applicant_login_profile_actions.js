import axios from "axios";
import { userConstants } from '../constants';
import URI from '../constants/URI';

//target action for applicant signup
export function applicantsignup(data) {
  console.log("inside applicant signup action")
  console.log(data)
  axios.defaults.withCredentials = true;
  const response =  axios.post(URI.ROOT_URL + '/signup_applicant/', data);
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_SIGNUP,
    payload: response
  };  
}

//target action for applicant login
export function applicantlogin(data) {
  console.log("inside applicant login action")
  console.log(data)
  axios.defaults.withCredentials = true;
  const response =  axios.post(URI.ROOT_URL + '/signin_applicant/', data);
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_LOGIN,
    payload: response
  };  
}

//target action for applicant profile fetch
export function getapplicantprofile(data) {
  console.log("inside applicant profile fetch action")
  console.log(data)
  axios.defaults.withCredentials = true;
  const response =  axios.post(URI.ROOT_URL + '/getApplicantProfile/', data);
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_PROFILE_FETCH,
    payload: response
  };  
}