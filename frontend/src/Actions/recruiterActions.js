import axios from "axios";
import URI from "../constants/URI";
import { userConstants } from '../constants';

const ROOT_URL = URI.ROOT_URL;

export const RECRUITER_SIGNIN_SUCCESS = "recruiter_signin_success";
export const RECRUITER_SIGNIN_FAILURE = "recruiter_signin_failure";

export const RECRUITER_SIGNUP_SUCCESS = "recruiter_signup_success";
export const RECRUITER_SIGNUP_FAILURE = "recruiter_signup_failure";

export const CREATE_JOB_SUCCESS = "create_job_successfully";
export const CREATE_JOB_FAILURE = "create_job_error";
export const FETCH_JOBS_SUCCESS = "fetch_jobs_successfully";
export const FETCH_JOBS_FAILURE = "fetch_jobs_error";



export function recruiterSignUp(data) {
    return async dispatch => {
      try {
        axios.defaults.withCredentials = true;
        var response = await axios.post(`${ROOT_URL}/signup_recruiter`, data);
        console.log(response);
        if (response.status === 200) {
            localStorage.setItem(
                userConstants.USER_DETAILS,
                JSON.stringify(response.data)
              );
              localStorage.setItem(
                userConstants.AUTH_TOKEN,
                JSON.stringify(response.data.token)
              );
          dispatch({
            type: RECRUITER_SIGNUP_SUCCESS,
            payload: "Successful"
          });
        } 
      } catch (error) {
        dispatch({
            type: RECRUITER_SIGNUP_FAILURE,
            payload: error.response.status+":" +error.response.statusText
          });
      }
    };
  }


export function recruiterSignIn(data) {
  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      /**
       * TODO 
       * Check Role
       */
      var response = await axios.post(`${ROOT_URL}/signin_recruiter`, data);
      if (response.payload.status === 200) {
        localStorage.setItem(
          userConstants.USER_DETAILS,
          JSON.stringify(response.payload.data)
        );
        localStorage.setItem(
          userConstants.AUTH_TOKEN,
          JSON.stringify(response.payload.data.token)
        );
        dispatch({
          type: RECRUITER_SIGNIN_SUCCESS,
          payload: "Successful"
        });
      } 
    } catch (error) {
      dispatch({
        type: RECRUITER_SIGNIN_FAILURE,
        payload: "Error Signing In"
      });
    }
  };
}



export function createNewJob(data) {
  data.recruiterID = "012675443";
  data.postedDate="2018-08-10"
  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] = JSON.parse(
        localStorage.getItem("auth_token")
      );
      var response = await axios.post(`${ROOT_URL}/post_job`, data);
      if (response.status === 200) {
        dispatch({
          type: CREATE_JOB_SUCCESS,
          payload: "Successful"
        });
      } 
    } catch (error) {
      dispatch({
        type: CREATE_JOB_FAILURE,
        payload: "Error Adding Job"
      });

    }
  };
}

export function getRecruiterJobs() {
  let recruiterID = "012675443";
  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] = JSON.parse(
        localStorage.getItem("auth_token")
      );
      var response = await axios.get(`${ROOT_URL}/get_jobs_by_recruiter`, {
        params: {
          recruiterID
        }
      });
      if (response.status === 200) {
        dispatch({
          type: FETCH_JOBS_SUCCESS,
          payload: response.data.allJobs
        });
      } 
    } catch (error) {
      dispatch({
        type: FETCH_JOBS_FAILURE,
        payload: error
      });
    }
  };
}
