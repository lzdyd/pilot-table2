import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  UPDATE_STORE_DATA
} from '../constants/index';

import { calculate } from '../services/api/calc';

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

function updateEvaluates(data, formula) {
    let parseFormula = formula.split(' ');
    let parseOpe = parseFormula.splice(parseFormula.indexOf('+'), 1);
    // let parseFormulaCopy = [...parseFormula];
    let newArr = [];
    let res;
    // console.log(parseOpe);

    parseFormula.forEach((item) => {
        // data.forEach((obj) => {
        //     for (let key in obj) {
        //         console.log(obj);
        //         if (obj[key] === item) {
        //             // parseFormulaCopy.splice(parseFormula.indexOf(item), 1, obj.value);
        //             // res += +obj.value;
        //             newArr.push(+obj.value);
        //             // console.log(+obj.value)
        //         }
        //     }
        //
        //     res = newArr.reduce((a, b) => a + b);
        // })

        // console.log(item);
        // console.log(data);

    });

    data.forEach((obj) => {
        parseFormula.forEach((item) => {
            for (let key in obj) {
                console.log(key === item)
            }
        })
    });


    // console.log(newArr);
    // res = calculate(parseFormulaCopy.join(""));


    return res;
}


function updateStoreData(payloadData) {
    const attr = this.data.attributes;

    const elementPos = attr.map((item) => {
      return item.id;
    }).indexOf(payloadData.id);

    attr[elementPos].value = payloadData.data;

    attr[2].value = updateEvaluates.call(this, attr, attr[2].formula);
    // attr[10].value = updateEvaluates.call(this, attr, attr[3].formula);
    // attr[12].value = updateEvaluates.call(this, attr, attr[4].formula);

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

      return {
          ...state,
          data: updateStoreData.call(state, action.payload)
      };

    default:
      return state;
  }
}
