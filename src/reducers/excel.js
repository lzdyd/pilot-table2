import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  CALCULATE_INITIAL_DATA,
  UPDATE_STORE_DATA
} from '../constants/index';

/**
 * @description Creates initial state for excel table
 * @property { object }  data      - Contains excel data
 * @property { boolean } fetching  - If true, inform that data is being fetched
 */
const initialState = {
  data: {},
  fetching: true,
  valuesHash: {}
};

/**
 Idle status
 Additional check - checks if value can be changed
 Not really sure that this check is needed
 @param { Object } payloadData - Updated data received from input
 */
function checkStoreData(payloadData) {
  const elementPos = this.data.attributes.map((item) => {
    return item.id;
  }).indexOf(payloadData.id);

  const tableRowToUpdate = this.data.attributes[elementPos];

  if (tableRowToUpdate.state === 'input-field') {
    return true;
  }
}

/**
 * @description Finds in store object with id === payload.id
 * and updates it with new value
 * NOT sure that it's a good solution from the point of view of performance
 * @param { Object } payloadData - Row id and new value
 */
function updateStoreData(payloadData) {
  const elementPos = this.data.attributes.map((item) => {
    return item.id;
  }).indexOf(payloadData.id);

  this.data.attributes[elementPos].value = payloadData.data;

  return this.data;
  // return '';
}

function getDependencies(formula) {
  if (!formula) return null;

  return formula.match(/id\d+/g);
}

/**
 * @description Creates hash table, where key is cell's id, value is cell's value
 * @param { Object } data - received data from REST API server
 * @returns {{}}
 */
function createHash(data) {
  let hash = {};

  Object.values(data.attributes).forEach((item) => {
    const dependencies = getDependencies(item.formula);

    hash[`id${item.id}`] = {
      dependencies,
      value: item.value || null
    };
  });

  return hash;
}

function calculateData(data) {

}

export default function employeesTable(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return { ...state, data: '', fetching: true };

    case GET_DATA_SUCCESS:
      return { ...state,
        data: action.payload,
        valuesHash: createHash(action.payload),
        fetching: false
      };

    case GET_DATA_FAILURE:
      return { ...state, error: action.payload, fetching: false };

    case UPDATE_STORE_DATA:
      return { ...state, data: updateStoreData.call(state, action.payload) };

    case CALCULATE_INITIAL_DATA:
      calculateData.call(state);
      return { ...state };

    default:
      return state;
  }
}
