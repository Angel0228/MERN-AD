import {
  ADD_ADVERT,
  GET_ADVERTS,
  GET_ADVERT,
  ADVERT_LOADING,
  ADD_COMMENTTOADVERT
} from "../actions/types";

const initialState = {
  adverts: [],
  advert: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADVERT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ADVERT:
      return {
        ...state,
        advert: action.payload,
        loading: false
      };
    case GET_ADVERTS:
      return {
        ...state,
        adverts: action.payload,
        loading: false
      };
    case ADD_ADVERT:
      return {
        ...state,
        adverts: [action.payload, ...state.adverts]
      };
    case ADD_COMMENTTOADVERT:
      return {
        ...state,
        advert: action.payload
      };
    default:
      return state;
  }
}
