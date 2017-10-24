import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  CALCULATE_INITIAL_DATA,
  UPDATE_STORE
} from '../constants/index';

/**
 * @description Creates initial state for excel table
 * @property { object }  data      - Contains excel data
 * @property { boolean } fetching  - If true, inform that data is being fetched
 * @property { Object } valuesHash - Hash table of received attributes
 */

const initialState = {
  data: {},
  fetching: false,
  valuesHash: {}
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

  return this.data;
}

/**
 * @param { String } formula - cell's formula
 * @returns { Array } Array of cells on which current cell depends
 */
function getDependencies(formula) {
  if (!formula) return null;

  return formula.match(/id\d+/g);
}

/**
 * @description Creates hash table, where key is cell's id, value is object of cell's attributes
 * Attributes:
 * 1) Dependencies - array of cells on which current cell depends
 * 2) Value - cell's value
 * 3) State - if cell contains formula, this attributes says if the cell needs recalculation
 * State takes 2 parameters - "Waiting" and "Calculated"
 * @param { Object } data - received data from REST API server
 * @returns {{}}
 */
function createValuesHash(data) {
  const hash = {};

  Object.values(data.attributes).forEach((item) => {
    const dependencies = getDependencies(item.formula);

    hash[`id${item.id}`] = {
      dependencies,
      value: item.value || null
    };

    if (dependencies) {
      hash[`id${item.id}`].state = null;
      hash[`id${item.id}`].formula = item.formula;
    }
  });

  return hash;
}

function evalJSON(item) {
  const restructuredFunc = item.formula.replace(/id\d+/g, (str) => {
    return `+this.id${str.match(/\d+/)}.value`;
  });

  let result;

  try {
    result = eval('(' + restructuredFunc + ')') || 'Ошибка вычислений';
  } catch (e) {
    result = 'Ошибка вычислений';
  }

  return result;
}

const calculateDependency = function calculateDependency(dependency) {
  let hash = JSON.parse(JSON.stringify(this));

  if (this[dependency].dependencies) {
    const dependencyDependencies = this[dependency].dependencies;

    dependencyDependencies.forEach((item) => {
      if (hash[item].dependencies) {
        hash[item].dependencies.forEach((currentItem) => {
          if (hash[currentItem].dependencies) {
            hash = calculateDependency.call(hash, currentItem);
          }
        });

        const currentItemResult = evalJSON.call(hash, hash[item]);

        hash[item].value = currentItemResult;
        hash[item].state = 'calculated';
      }
    });

    const result = evalJSON.call(hash, hash[dependency]);
    hash[dependency].value = result;
    hash[dependency].state = 'calculated';

    return hash;
  }

  return hash[dependency];
};

function calculateData() {
  // let valuesHash = Object.assign({}, this.valuesHash);
  let valuesHash = JSON.parse(JSON.stringify(this.valuesHash));

  for (let key in valuesHash) {
    if (Object.prototype.hasOwnProperty.call(valuesHash, key)) {
      if (valuesHash[key].dependencies) valuesHash[key].state = 'waiting';
    }
  }

  for (let key in valuesHash) {
    if (Object.prototype.hasOwnProperty.call(valuesHash, key)) {
      const item = Object.assign({}, valuesHash[key]);

      if (item.dependencies && item.state !== 'calculated') {
        item.dependencies.forEach((dependency) => {
          if (valuesHash[dependency].dependencies) {
            valuesHash = JSON.parse(JSON.stringify(calculateDependency.call(valuesHash, dependency)));
          }
        });

        const evaluatedJSON = evalJSON.call(valuesHash, item);
        valuesHash[key].value = evaluatedJSON;
        valuesHash[key].state = 'calculated';
      }
    }
  }

  // TODO: it mutates store. Rewrite it
  this.data.attributes.map((item) => {
    return item.value = valuesHash[`id${item.id}`].value;
  });

  return valuesHash;
}

const checkDependencies = function checkDependencies(node, updatedNode) {
  const hash = JSON.parse(JSON.stringify(this));
  const dependencyDependencies = hash[node].dependencies;

  dependencyDependencies.forEach((item) => {
    if (hash[item].dependencies) {
      hash[item].dependencies.forEach((currentItem) => {
        if (hash[currentItem].dependencies) {
          checkDependencies.call(hash, currentItem, updatedNode);
        }
      });
    }
  });
};

function updateStore(payload) {
  let valuesHash = JSON.parse(JSON.stringify(this.valuesHash));

  valuesHash[`id${payload.id}`].value = payload.data;

  for (let key in valuesHash) {
    if (Object.prototype.hasOwnProperty.call(valuesHash, key)) {
      if (valuesHash[key].dependencies) {
        checkDependencies.call(valuesHash, key, payload.id);
      }
      // if (valuesHash[key].dependencies) valuesHash[key].state = 'waiting';
    }
  }
  // console.log(valuesHash);
}

export default function employeesTable(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return { ...state, fetching: true };

    case GET_DATA_SUCCESS:
      return { ...state,
        data: action.payload,
        valuesHash: createValuesHash(action.payload),
        fetching: false
      };

    case GET_DATA_FAILURE:
      return { ...state, error: action.payload, fetching: false };

    case CALCULATE_INITIAL_DATA:
      return { ...state, valuesHash: calculateData.call(state) };

    case UPDATE_STORE:
      updateStore.call(state, action.payload);
      return { ...state };

    default:
      return state;
  }
}
