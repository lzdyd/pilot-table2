import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  UPDATE_STORE_DATA
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

/**
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
 * NOT sure that it's a good solution from the point of view of perfomance
 * @param { Object } payloadData - Row id and new value
 */
function updateStoreData(payloadData) {

  const elementPos = this.data.attributes.map((item) => {
    return item.id;
  }).indexOf(payloadData.id);

  this.data.attributes[elementPos].value = payloadData.data;
  this.data.attributes[2].value = +this.data.attributes[0].value + +this.data.attributes[1].value;
  this.data.attributes[3].value = +this.data.attributes[0].value - +this.data.attributes[1].value;
  this.data.attributes[4].value = Math.ceil(+this.data.attributes[2].value / +this.data.attributes[3].value) + "%";

  return this.data;
}

export default function employeesTable(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return { ...state, data: '', fetching: true };

    case GET_DATA_SUCCESS:
      return { ...state, data: action.payload, fetching: false };

    case GET_DATA_FAILURE:
      return { ...state, error: action.payload, fetching: false };

      case UPDATE_STORE_DATA:
      /*
      if (updateStoreData.call(state, action.payload)) {
        return { ...state, data: '' };
      }
      return state;
      */
      return {
          ...state,
          data: updateStoreData.call(state, action.payload)
      };

    default:
      return state;
  }
}
