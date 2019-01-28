import axios from "axios";

import { GET_ADVERTS, ADVERT_LOADING } from "./types";

// Get all adverts
export const getAdverts = () => dispatch => {
  dispatch(setAdvertLoading());
  axios
    .get("/api/adverts/")
    .then(res =>
      dispatch({
        type: GET_ADVERTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ADVERTS,
        payload: {}
      })
    );
};

//Advert loading
export const setAdvertLoading = () => {
  return {
    type: ADVERT_LOADING
  };
};
