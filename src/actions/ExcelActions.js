import getDocumentDataAPI from 'api/getDocumentData';

import {
  GET_DATA_REQUEST,
  GET_XML_DATA_SUCCESS,
  GET_XML_DATA_FAILURE,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  CALCULATE_INITIAL_DATA,
  UPDATE_STORE
} from '../constants/index';

export function getDocumentData() {
  return ((dispatch) => {
    dispatch({
      type: GET_DATA_REQUEST,
      payload: 'Loading...'
    });

    getDocumentDataAPI('./doctype_view_opu.xml')
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

    getDocumentDataAPI('./doctype_opu.xml')
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

    getDocumentDataAPI('./doc-data_opu.json')
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
