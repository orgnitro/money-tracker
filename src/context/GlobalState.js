import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';


const transactionsFromStorage = localStorage.getItem('transactions');
const initialState = {
  transactions: transactionsFromStorage ? JSON.parse(transactionsFromStorage) : []
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  
  useEffect( () => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions))
  }, [state.transactions]);
  
  function delTransaction(id) {
    dispatch({
      type: 'DELETE',
      payload: id
    });
  }

  function editTransaction(transaction) {
    dispatch({
      type: 'EDIT',
      payload: transaction
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD',
      payload: transaction
    });
  }

  return <GlobalContext.Provider value={{
    transactions: state.transactions,
    delTransaction,
    editTransaction,
    addTransaction
  }}>
    { children }
  </GlobalContext.Provider>

}
