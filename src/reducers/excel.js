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
  this.valuesHash[`id${payloadData.id}`].value = payloadData.data;

  Object.values(this.valuesHash).forEach((item) => {
    if (item.dependencies) {
      for (let i = 0; i < item.dependencies.length; i += 1) {
        checkDependecies(item, payloadData.id);

        if (item.dependencies[i] === `id${payloadData.id}`) {
          //console.log('1233')
        }

      }
    }
  });

  const updatedData = Object.assign({}, this.data);

  const elementPos = updatedData.attributes.map((item) => {
    return item.id;
  }).indexOf(payloadData.id);

  updatedData.attributes[elementPos].value = payloadData.data;

  return updatedData;
}

function checkDependecies(dependency, updatedField) {
  for (let i = 0; i < dependency.dependencies.length; i += 1) {
    console.log(dependency.dependencies[i] === `id${updatedField}`);
  }
}

const calculateDependecies = function calculateDependecies(dependency){

};

function updateStoreDataAttributes(calculatedData) {
  const updatedData = Object.assign({}, this.data);

  updatedData.attributes = calculatedData;

  return updatedData;
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
  const hash = {};

  Object.values(data.attributes).forEach((item) => {
    const dependencies = getDependencies(item.formula);

    hash[`id${item.id}`] = {
      dependencies,
      value: item.value || null
    };
  });

  return hash;
}

/**
 * TODO: describe this function
 * Evaluates JavaScript function received via REST API and returns its result
 * Just a prototype - needs refactoring
 * @param { Object } item
 */
const evalJSON = function evalJSON(item) {
  if (item.formula) {
    const dependencies = item.formula.match(/id\d+/g);

    dependencies.forEach((currentItem) => {
      if (!this.valuesHash[currentItem].value) {
        const dependency = this.data.attributes.filter((x) => {
          return x.id === currentItem.match(/\d/)[0];
        });

        evalJSON.call(this, dependency[0]);
      }
    });

    const restructuredFunc = item.formula.replace(/id\d+/g, (str) => {
      return `+this.valuesHash.id${str.match(/\d+/)}.value`;
    });

    let result;

    try {
      result = eval('(' + restructuredFunc + ')') || 'Ошибка вычислений';
    } catch (e) {
      result = 'Ошибка вычислений';
    }

    this.valuesHash[`id${item.id}`].value = JSON.stringify(result);

    return result;
  }

  return null;
};

/**
 @description Returns new object with calculated values
 */
function calculateInitialData() {
  const calculatedData = this.data.attributes.map((item) => {
    const currentItem = Object.assign({}, item);

    if (!currentItem.value) {
      currentItem.value = JSON.stringify(evalJSON.call(this, currentItem));
    }

    return currentItem;
  });

  return calculatedData;
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

    case CALCULATE_INITIAL_DATA:
      return { ...state, data: updateStoreDataAttributes.call(state, calculateInitialData.call(state)) };

    case UPDATE_STORE_DATA:
      return { ...state, data: updateStoreData.call(state, action.payload) };

    default:
      return state;
  }
}
