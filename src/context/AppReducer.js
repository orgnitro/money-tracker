const AppReducer = (state, action) => {
  switch(action.type) {
    case 'DELETE':
      return {
        ...state,
        transactions: state.transactions
        .filter(item => item.id !== action.payload)
      }
    case 'EDIT':
      return {
        ...state,
        transactions: 
          state.transactions
          .map(item => {
            if (item.id === action.payload.id) item = action.payload;
            return item;
          })
      }
    case 'ADD':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions] 
      }
    default:
      return state;
  }
}

export default AppReducer