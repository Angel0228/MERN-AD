import axios from "axios";

import { GET_CATEGORY, GET_CATEGORIES } from "./types";

// Get all adverts
export const getCategories = () => dispatch => {
  axios
    .get("/api/category/")
    .then(res =>
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CATEGORIES,
        payload: {}
      })
    );
};

// Get all adverts by id
export const getCategoriesById = id => dispatch => {
  axios
    .get(`/api/category/${id}`)
    .then(res =>
      dispatch({
        type: GET_CATEGORY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CATEGORY,
        payload: {}
      })
    );
};
