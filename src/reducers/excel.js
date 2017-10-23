import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  UPDATE_STORE_DATA
} from '../constants/index';
import Graph from '../services/graph'


import { evaluatesDependence } from '../services/evalDependence';

/**
 * @description Creates initial state for excel table
 * @property { object }  data      - Contains excel data
 * @property { boolean } fetching  - If true, inform that data is being fetched
 */

const initialState = {
  fetching: true
};

 function graphTable(data) {
    const graph = new Graph();
    const attr = data.attributes;

    for(let i=0; i < attr.length; i++) {
        let obj = attr[i];

        graph.addNode(
            obj.id,
            obj.value,
            obj.label,
            obj.state,
            obj.formula
        );
    }

     attr.forEach((node) => {
         if (node.state === 'calculated-field') {
             let formula = node.formula.replace(/\+/g, '').split(" ").filter(item => item && item);

             for (let i = 0; i < formula.length; i++) {
                 graph.addLine(node.id, formula[i]);
             }
         }
     });

     return graph;
}


function updateStoreData(payloadData) {
    const attr = this.nodes;

    const elementPos = attr.map((item) => {
      return item.key;
    }).indexOf(payloadData.id);

    attr[elementPos].value = payloadData.data;

    attr.forEach((node) => {
        if (node.state === 'calculated-field') {
            node.dependence.forEach((item) => {
                if (item.key === payloadData.id) {
                    // console.log(node);
                    node.value = evaluatesDependence(node);
                }
            });
        }
    })
}

export default function employeesTable(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return {
          ...state,
          fetching: true
      };

      case GET_DATA_SUCCESS:
      return {
          ...state,
          ...graphTable(action.payload),
          fetching: false
      };

    case GET_DATA_FAILURE:
      return {
          ...state,
          error: action.payload,
          fetching: false
      };

      case UPDATE_STORE_DATA:
          return {
              ...state,
              ...updateStoreData.call(state, action.payload)
          };

    default:
      return state;
  }
}
