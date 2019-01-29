import axios from "axios";

import { GET_USER, USER_LOADING } from "./types";
// Get Adbert By ID
export const getUserById = id => dispatch => {
  dispatch(setUserLoading());
  axios
    .get(`/api/users/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER,
        payload: null
      })
    );
};

//User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
