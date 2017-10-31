import { getDOClIST } from '../services/api/getData';
import axios from 'axios';


export function getDocList() {
  return ((dispatch) => {
    dispatch({
      type: 'GET_DOCLIST_REQUEST',
      payload: 'Loading...'
    });

    axios.get('../../docList.json')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
