const initialState = {
  fetching: true,
  docList: null
};

export default function DocList(state = initialState, action) {
  switch (action.type) {
    case 'GET_DOCLIST_REQUEST':
      return {
        ...state,
        fetching: true
      };

    case 'GET_DOCLIST_SUCCESS':
      return {
        ...state,
        docList: action.payload,
        fetching: false
      };

    case 'GET_DOCLIST_FAILURE':
      return {
        ...state,
        error: action.payload,
        fetching: false
      };

    default:
      return state;
  }
}