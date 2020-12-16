import React, {useContext} from 'react';
import { Bar } from 'react-chartjs-2';
import { GlobalContext } from '../context/GlobalState';


export const ChartComponent = () => {
  const { transactions } = useContext(GlobalContext);

  let incomes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let expenses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  annualIncomesExpenses(incomes, expenses, transactions);  

  return (
   <div className="chartWrapper">
    <Bar
      data = {{
        labels: ['Jan', 'Feb', 'Mar', 
                 'Apr', 'May', 'Jun', 
                 'Jul', 'Aug', 'Sep', 
                 'Oct', 'Nov', 'Dec'
                ],
        datasets: [{
          label: 'Income',
          backgroundColor: '#00cc44',
          hoverBackgroundColor: '#009933',
          data: incomes
          },
          {
            label: 'Expense',
            backgroundColor: '#ff6666',
            hoverBackgroundColor: '#ff3333',
            data: expenses
          }
      ]}}
      height={300}
      width={600}
     />
  </div>
  )
}


function annualIncomesExpenses(incomesArr, expensesArr, transactions) {
  transactions.forEach(item => {
    if (item.amount > 0) {
      incomesArr[+item.date.slice(5, 7) - 1] += item.amount;
    }
  });
    transactions.forEach(item => {
      if (item.amount < 0) {
        expensesArr[+item.date.slice(5, 7) - 1] += item.amount * -1;
      } 
    });
}