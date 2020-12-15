import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';


export const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map( transaction => transaction.amount );
  const total = amounts.reduce( ((acc, val) => acc += val), 0 ).toFixed(2);

  return (
    <>
      <div className="budget">
        <h4>Your Budget</h4>
        <h2>${total}</h2>
      </div>
      
    </>
  )
}
