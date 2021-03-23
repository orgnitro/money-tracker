import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Balance } from './Balance';


export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
  .filter(amount => amount > 0)
  .reduce(((acc, val) => acc += val), 0)
  .toFixed(2);

  const expense = amounts
  .filter(amount => amount < 0)
  .reduce(((acc, val) => acc += val), 0)
  .toFixed(2)
  .replace('-', '');


  return (
    <div className="inc-exp-balance">
      <div>
        <div>
          <h4>Total Income</h4>
          <p className="money plus">${income}</p>
        </div>
        <div>
          <h4>Total Expense</h4>
          <p className="money minus">${expense}</p>
        </div>
      </div>
      <Balance />
    </div>
  )
}
