import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { HomeReducer } from "./reducer_home";
import  JobsReducer  from "./reducer_jobs";
import  ShowJobsReducer  from "./reducer_showjobs";

const rootReducer = combineReducers({
    HomeReducer,
    JobsReducer,
    ShowJobsReducer,
    form: formReducer
});
export default rootReducer;