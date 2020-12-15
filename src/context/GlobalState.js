import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';


const initialState = {transactions: []}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
    const localData = localStorage.getItem('transactions');
    return localData ? JSON.parse(localData) : [];
  });
  
  useEffect( () => {
    localStorage.setItem('transactions', JSON.stringify(state))
  }, [state]);
  
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
