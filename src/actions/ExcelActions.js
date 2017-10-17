import getDataAPI from 'api/getData';

import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  UPDATE_STORE_DATA,
  UPDATE_STORE_DATA_COMPLETELY
} from '../constants/index';

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

export function updateStoreDataCompletely(data) {
  return {
    type: UPDATE_STORE_DATA_COMPLETELY,
    payload: data
  };
}
