import axios from "axios";
const ROOT_URL = "http://localhost:5000";

export const CREATE_JOB_SUCCESS = "create_job_successfully";
export const CREATE_JOB_FAILURE = "create_job_error";

export const FETCH_JOBS_SUCCESS = "fetch_jobs_successfully";
export const FETCH_JOBS_FAILURE = "fetch_jobs_error";


export function createNewJob(data) {
  data.recruiterID="012675443"
  //data.postedDate="2018-08-10"
  console.log(data);

  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      // axios.defaults.headers.common["Authorization"] =
      //   "JWT " + localStorage.getItem("user");
      var response = await axios.post(
        `${ROOT_URL}/post_job`,
        data
      );
      if (response.status === 200) {
        dispatch({
          type: CREATE_JOB_SUCCESS,
          payload: "Job Added SuccessFully"
        });
      }else{
        dispatch({
          type: CREATE_JOB_FAILURE,
          payload: "Error Adding Job"
        });
        console.log(response.data);
      }
    } catch (error) {
      dispatch({
        type: CREATE_JOB_FAILURE,
        payload: "Error Adding Job"
      });
      console.log(response.status);
      console.log(response.data);
    }
  };
}




export function getRecruiterJobs() {
   let recruiterID= "012675443";
  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      // axios.defaults.headers.common["Authorization"] =
      //   "JWT " + localStorage.getItem("user");
      var response = await axios.get(`${ROOT_URL}/get_jobs_by_recruiter`, {
        params: {
          recruiterID
        }
      });
      console.log(response.data);
      if (response.status === 200) {
        dispatch({
          type: FETCH_JOBS_SUCCESS,
          payload: response.data.allJobs
        });
      }else{
        dispatch({
          type: FETCH_JOBS_FAILURE,
          payload: "Error Fetching Job"
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


