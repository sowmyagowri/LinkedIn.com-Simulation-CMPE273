import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { HomeReducer } from "./reducer_home";
import  JobsReducer  from "./reducer_jobs";
import  ShowJobsReducer  from "./reducer_showjobs";
import Conversations from "./reducer_messages";
import RecruiterLoginReducer from "./reducer_recruiter_sigin";
import RecruiterSignUpReducer from "./reducer_recruiter_signup";

const rootReducer = combineReducers({
    HomeReducer,
    JobsReducer,
    ShowJobsReducer,
    RecruiterLoginReducer,
    form: formReducer,
    RecruiterSignUpReducer,
    conversations: Conversations
});
export default rootReducer;