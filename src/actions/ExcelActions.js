import getDataAPI from 'api/getData';

import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE
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
