import { GET_USER, USER_LOADING } from "../actions/types";

const initialState = {
  userprofile: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USER:
      return {
        ...state,
        userprofile: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
