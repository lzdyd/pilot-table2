import getDataAPI from 'api/getData';

import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  CALCULATE_INITIAL_DATA,
  UPDATE_STORE_DATA
} from '../constants/index';

/**
 Makes API request to get data and then calculates initial data
 */
export function getData() {
  return ((dispatch) => {
    dispatch({
      type: GET_DATA_REQUEST,
      payload: 'Loading...'
    });

    getDataAPI()
      .then((response) => {
        dispatch({
          type: GET_DATA_SUCCESS,
          payload: JSON.parse(response)
        });
      })
      .then(() => {
        dispatch({
          type: CALCULATE_INITIAL_DATA
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_DATA_FAILURE,
          payload: err
        });
      });
  });
}

export function updateStoreData(id, data) {
  return {
    type: UPDATE_STORE_DATA,
    payload: {
      id,
      data
    }
  };
}
