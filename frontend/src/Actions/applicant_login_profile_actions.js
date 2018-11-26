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
export async function getapplicantprofile(email, tokenFromStorage) {
  console.log("inside applicant profile fetch action")
  var config = {
    headers: {
      'Authorization': tokenFromStorage,
      'Content-Type': 'application/json',
      withCredentials : true
    }
  };
  axios.defaults.withCredentials = true;
  const response = await axios.get(URI.ROOT_URL + '/get_applicant_profile/' , {
    params: {
      email
    } , 
    ...config
  });
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_PROFILE_FETCH,
    payload: response
  };  
}

//target action for applicant profile summary update
export async function applicantprofilesummary(data, tokenFromStorage) {
  console.log("inside applicant profile summary update action")
  var config = {
    headers: {'Authorization': tokenFromStorage,
              'Content-Type': 'application/json',
              withCredentials : true
    }
  };
  axios.defaults.withCredentials = true;
  const response = await axios.post(URI.ROOT_URL + '/post_applicant_profile_summary/' , data, config);
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_PROFILE_SUMMARY_POST,
    payload: response
  };
}

//target action for applicant profile experience update
export function applicantprofileexperience(data, tokenFromStorage) {
  console.log("inside applicant profile experience update action")
  console.log(data)
  console.log(tokenFromStorage);
  var config = {
    headers: {'Authorization': tokenFromStorage,
              'Content-Type': 'application/json'
    }
  };
  axios.defaults.withCredentials = true;
  const response =  axios.post(URI.ROOT_URL + '/post_applicant_profile_experience/' , data, config);
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_PROFILE_EXPERIENCE_POST,
    payload: response
  };  
}

//target action for applicant profile education update
export function applicantprofileeducation(email, tokenFromStorage, data) {
  console.log("inside applicant profile education update action")
  console.log(email)
  console.log(tokenFromStorage);
  var config = {
    headers: {'Authorization': tokenFromStorage,
              'Content-Type': 'application/json'
    }
  };
  axios.defaults.withCredentials = true;
  const response =  axios.get(URI.ROOT_URL + '/post_applicant_profile_education/' , {
    params: {
      email
    } , 
    ...config
  });
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_PROFILE_EDUCATION_POST,
    payload: response
  };  
}

//target action for applicant profile skills update
export function applicantprofileskills(email, tokenFromStorage, data) {
  console.log("inside applicant profile skills update action")
  console.log(email)
  console.log(tokenFromStorage);
  var config = {
    headers: {'Authorization': tokenFromStorage,
              'Content-Type': 'application/json'
    }
  };
  axios.defaults.withCredentials = true;
  const response =  axios.get(URI.ROOT_URL + '/post_applicant_profile_skills/' , {
    params: {
      email
    } , 
    ...config
  });
  console.log("Response", response);
  return {
    type: userConstants.APPLICANT_PROFILE_SKILLS_POST,
    payload: response
  };  
}