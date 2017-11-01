import { getDataAPI, getDocAPI } from 'api/getData';
import axios from 'axios';

import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  UPDATE_STORE_DATA
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


export function getDocList() {
  const url = 'http://localhost:8080/test/docList?clientName=CLIENT1&Q=3&year=2017';
  const url2 = './data2.json';

  return ((dispatch) => {
    dispatch({
      type: 'GET_DOCLIST_REQUEST',
      payload: 'Loading...'
    });

    axios.get(url, {crossdomain: true})
      .then((response) => {
        dispatch({
          type: 'GET_DOCLIST_SUCCESS',
          payload: response.data
        });
      })
      .catch((err) => {
        dispatch({
          type: 'GET_DOCLIST_FAILURE',
          payload: err
        });
      });
  });
}
