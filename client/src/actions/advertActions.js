import axios from "axios";

import {
  GET_ADVERTS,
  ADVERT_LOADING,
  GET_ERRORS,
  GET_ADVERT,
  ADD_COMMENTTOADVERT
} from "./types";

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

// Get Adbert By ID
export const getAdvertById = id => dispatch => {
  dispatch(setAdvertLoading());
  axios
    .get(`/api/adverts/${id}`)
    .then(res =>
      dispatch({
        type: GET_ADVERT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ADVERT,
        payload: null
      })
    );
};

//Create Advert
export const createAdvert = (advertData, history) => dispatch => {
  axios
    .post("/api/adverts/create", advertData)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Create Advert Comment
export const addCommentToAdvert = (id, commentData) => dispatch => {
  axios
    .post(`/api/adverts/comment/${id}`, commentData)
    .then(res =>
      dispatch({
        type: ADD_COMMENTTOADVERT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Update Advert
export const updateAdvert = (id, advertData, history) => dispatch => {
  axios
    .put(`/api/adverts/update/${id}`, advertData)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update Advert status
export const updateAdvertStatus = (id, history) => dispatch => {
  axios
    .put(`/api/adverts/status/${id}`)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Advert By Id
export const deleteAdvert = (id, history) => dispatch => {
  axios
    .delete(`/api/adverts/delete/${id}`)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Advert loading
export const setAdvertLoading = () => {
  return {
    type: ADVERT_LOADING
  };
};
