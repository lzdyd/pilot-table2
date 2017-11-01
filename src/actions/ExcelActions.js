import axios from 'axios';

import getDocumentDataAPI from 'api/getDocumentData';
import saveDocumentDataAPI from 'api/saveDocumentData';

import {
  GET_DOCLIST_REQUEST,
  GET_DOCLIST_SUCCESS,
  GET_DOCLIST_FAILURE,
  GET_DATA_REQUEST,
  GET_XML_DATA_SUCCESS,
  GET_XML_DATA_FAILURE,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  CALCULATE_INITIAL_DATA,
  UPDATE_STORE
} from '../constants/index';

export function getDocList() {
  // const url = 'http://localhost:8080/test/docList?clientName=CLIENT1&Q=3&year=2017';
  const url = './dataTable.json';

  return ((dispatch) => {
    dispatch({
      type: GET_DOCLIST_REQUEST,
      payload: 'Loading...'
    });

    axios.get(url, { crossdomain: true })
      .then((response) => {
        dispatch({
          type: GET_DOCLIST_SUCCESS,
          payload: response.data
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_DOCLIST_FAILURE,
          payload: err
        });
      });
  });
}

function getView() {
  return ((dispatch) => {
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
  });
}

function getDoctype() {
  return ((dispatch) => {
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
  });
}

export function getDocumentData() {
  return ((dispatch) => {
    dispatch({
      type: GET_DATA_REQUEST,
      payload: 'Loading...'
    });

    Promise.all([
      dispatch(getView()),
      dispatch(getDoctype())
    ]).then(() => {
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

export function saveData(data, doctype) {
  saveDocumentDataAPI(data, doctype);
}
