import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  UPDATE_STORE_DATA
} from '../constants/index';
import Graph from '../services/graph'

import { calculate } from '../services/api/calc';
import { evaluatesDependence } from '../services/evalDependence';

/**
 * @description Creates initial state for excel table
 * @property { object }  data      - Contains excel data
 * @property { boolean } fetching  - If true, inform that data is being fetched
 */

const initialState = {
  fetching: true
};


// function createGraphDependence(state) {
//     state.forEach((node) => {
//         if (node.formula) {
//             for (let i = 0; i < formula.length; i++) {
//                 graph.addLine(node.id, formula[i]);
//             }
//         }
//     })
//
//     // console.log(state)
// }


 function graphTable(data) {
    const graph = new Graph();

    for (let key in data) {
        if (key === 'attributes') {
            for(let i=0; i < data[key].length; i++) {
                let obj = data[key][i];

                graph.addNode(obj.id, obj.value, obj.label, obj.state, obj.formula);
            }
        }
    }

//TODO createGraphDependence ???
     data.attributes.forEach((node) => {
         if (node.state === 'calculated-field') {
             let formula = node.formula.replace(/\+/g, '').split(" ").filter(item => item && item);

             for (let i = 0; i < formula.length; i++) {
                 graph.addLine(node.id, formula[i]);
             }
         }
     });

     // evaluatesDependence.call(this, data.attributes);

     return graph;
}


// /**
//  Additional check - checks if value can be changed
//  Not really sure that this check is needed
//  @param { Object } payloadData - Updated data received from input
//  */
// function checkStoreData(payloadData) {
//     console.log(this.data);
//
//   // const elementPos = this.data.attributes.map((item) => {
//   //   return item.id;
//   // }).indexOf(payloadData.id);
//   //
//   // const tableRowToUpdate = this.data.attributes[elementPos];
//
//   // if (tableRowToUpdate.state === 'input-field') {
//   //   return true;
//   // }
// }

// /**
//  * @description Finds in store object with id === payload.id
//  * and updates it with new value
//  * NOT sure that it's a good solution from the point of view of perfomance
//  * @param { Object } payloadData - Row id and new value
//  */




function updateStoreData(payloadData) {
    const attr = this.nodes;

    const elementPos = attr.map((item) => {
      return item.key;
    }).indexOf(payloadData.id);

    attr[elementPos].value = payloadData.data;

    attr.forEach((node) => {
        for (let key in node) {
            if (node[key] === 'calculated-field') {
                node.value = evaluatesDependence(node);
            }
        }
    })

}

export default function employeesTable(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return { ...state, fetching: true };

      case GET_DATA_SUCCESS:
      return { ...state, ...graphTable(action.payload), fetching: false };

    case GET_DATA_FAILURE:
      return { ...state, error: action.payload, fetching: false };

      case UPDATE_STORE_DATA:

      return {
          ...state,
          ...updateStoreData.call(state, action.payload)
      };

    default:
      return state;
  }
}
