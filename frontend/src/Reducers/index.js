import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { HomeReducer } from "./reducer_home";

const rootReducer = combineReducers({
    HomeReducer,
    form: formReducer
});
export default rootReducer;