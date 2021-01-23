import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';


const transactionsFromStorage = localStorage.getItem('transactions');
const initialState = {
  transactions: transactionsFromStorage.length !== 2 ? JSON.parse(transactionsFromStorage) : [
    {id: "604f2aca-fddc-49ff-b5b7-c5b4aea6a17e", text: "Debt Repayment", amount: -200, date: "2021-03-19"},
    {id: "a1c4611d-abbc-427f-a992-1fa5b1bb8f25", text: "Income from cryptocurrency sale", amount: 400, date: "2021-03-15"},
    {id: "76c16353-f13e-4c1b-92cb-6fa5f3d8562d", text: "New Shoes", amount: -250, date: "2021-01-15"},
    {id: "5e7deb48-3a40-40ef-8dd1-8bf2dc13200b", text: "Salary", amount: 1000, date: "2021-01-14"},
    {id: "1a214c86-2267-4f7d-b9bf-1aecc02f1691", text: "Food", amount: -30, date: "2021-01-03"}
  ]
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
