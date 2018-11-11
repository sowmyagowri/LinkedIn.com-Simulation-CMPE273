import axios from "axios";
import { userConstants } from '../constants';

//target action for applicant signup
export function applicantsignup(data) {
  console.log("inside applicant signup action")
  console.log(data)
  axios.defaults.withCredentials = true;
  const response =  axios.post('http://localhost:5000/signup_recruiter/', data);
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_SIGNUP,
    payload: response
  };  
}