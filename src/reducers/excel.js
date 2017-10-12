import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE
} from '../constants/index';

/**
 * @description Creates initial state for excel table
 * @property { object }  data      - Contains excel data
 * @property { boolean } fetching  - If true, inform that data is being fetched
 */

const initialState = {
  data: {},
  fetching: true
};

export default function employeesTable(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return { ...state, data: '', fetching: true };

    case GET_DATA_SUCCESS:
      return { ...state, data: action.payload, fetching: false };

    case GET_DATA_FAILURE:
      return { ...state, error: action.payload, fetching: false };

    default:
      return state;
  }
}
