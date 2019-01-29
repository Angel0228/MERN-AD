import { combineReducers } from "redux";
import advertReducer from "./advertReducer";
import categoryReducer from "./categoryReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";

export default combineReducers({
  advert: advertReducer,
  category: categoryReducer,
  userprofile: userReducer,
  errors: errorReducer
});
