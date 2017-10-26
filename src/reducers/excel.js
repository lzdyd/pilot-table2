import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  UPDATE_STORE_DATA
} from '../constants/index';
import Graph from '../services/graph';
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

  attr.forEach(({ id, value, label, state, formula }) => {
    graph.addNode(
      id,
      value,
      label,
      state,
      formula
    );
  });


  attr.forEach(({ state, id, formula }) => {
    if (state === 'calculated-field') {
      const formulas = formula.replace(/\+/g, '').split(' ').filter(item => item && item);

      formulas.forEach(item => graph.addLine(id, item));
    }
  });

  return graph;
}


function updateStoreData({ id, data }) {
  const attr = this.nodes;
  const elementPos = attr.map((item) => {
    return item.key;
  }).indexOf(id);

  attr[elementPos].value = data;

  function getNodeWithDependence(data) {
    return data.filter((node) => {
      return node.state === 'calculated-field' && node;
    });
  }

  function isCalcForDependence(data, idValue) {
    data.forEach((node) => {
      node.dependence.forEach((item) => {
        if (item.key === idValue) {
          node.value = evaluatesDependence(node);

          data.forEach((obj) => {
            obj.dependence.forEach((items) => {
              if (node.key === items.key) obj.value = evaluatesDependence(obj);
            });
          });
        }
      });
    });
  }


  function dependencies(data) {
    isCalcForDependence(getNodeWithDependence(data), id);
  }

  dependencies(attr);
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
