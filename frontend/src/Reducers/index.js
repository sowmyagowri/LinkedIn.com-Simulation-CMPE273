import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { HomeReducer } from "./reducer_home";
import  JobsReducer  from "./reducer_jobs";
import  ShowJobsReducer  from "./reducer_showjobs";
import  { ConnectionsReducer}  from "./reducer_connections";
import Conversations from "./reducer_messages";

const rootReducer = combineReducers({
    HomeReducer,
    JobsReducer,
    ShowJobsReducer,
    ConnectionsReducer,
    form: formReducer,
    conversations: Conversations
});
export default rootReducer;