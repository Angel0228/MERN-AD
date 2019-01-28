import { combineReducers } from "redux";
import advertReducer from "./advertReducer";

export default combineReducers({
  advert: advertReducer
});
