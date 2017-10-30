import getDataAPI from 'api/getData';

import {
  GET_DATA_REQUEST,
  GET_XML_DATA_SUCCESS,
  GET_XML_DATA_FAILURE,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  CALCULATE_INITIAL_DATA,
  UPDATE_STORE
} from '../constants/index';

export function getData() {
  return ((dispatch) => {
    dispatch({
      type: GET_DATA_REQUEST,
      payload: 'Loading...'
    });

    getDataAPI('./doctype_view_opu.xml')
      .then((response) => {
        dispatch({
          type: GET_XML_DATA_SUCCESS,
          payload: {
            response,
            type: 'ReportType1'
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_XML_DATA_FAILURE,
          payload: err
        });
      });

    getDataAPI('./doctype_opu.xml')
      .then((response) => {
        dispatch({
          type: GET_XML_DATA_SUCCESS,
          payload: {
            response,
            type: 'docType1'
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_XML_DATA_FAILURE,
          payload: err
        });
      });

    getDataAPI('./doc-data_opu.json')
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

export function updateStore(id, data) {
  return {
    type: UPDATE_STORE,
    payload: {
      id,
      data
    }
  };
}
