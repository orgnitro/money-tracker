import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';


export const Transaction = ({ transaction }) => {
  const { delTransaction, editTransaction } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? '-' : '+';
  const dt = new Date();

  const editSelected = e => { 
    const li = e.target.closest('li');
    const amountField = li.querySelector('.transaction-amount');
    const textField = li.querySelector('.transaction-text');
    const dateField = li.querySelector('.transaction-date');

    const btn = e.target.closest('button');

    if (btn.classList.value !== 'edit-btn toggled'){
      btn.querySelector('span').innerText = 'done';

      textField.innerHTML = `<input type="text" value="${textField.innerHTML}" />`;
      amountField.innerHTML = `<input type="text" value="${Number(amountField.innerHTML.replace('$', ''))}" />`;
      dateField.innerHTML = `<input type="date" 
                                min="${dt.getFullYear()}-01-01" 
                                max="${dt.getFullYear()}-12-31" 
                                value="${dateField.innerHTML}" 
                              />`;
    } else {
      const textInput = textField.querySelector('input').value
      let amountInput = amountField.querySelector('input').value
      if ( isNaN(+amountInput) ) amountInput = '0';
      const dateInput = dateField.querySelector('input').value

      const editedTransaction = {
        id: transaction.id,
        text: textInput,
        amount: +amountInput,
        date: dateInput
      }
      btn.querySelector('span').innerText = 'create'
      textField.innerText = textInput === '' ? 'UNNAMED' : textInput;
      amountField.innerText = +amountInput < 0 ? '-$' + Math.abs(amountInput) : '+$' + amountInput;
      dateField.innerText = dateInput;

      editTransaction(editedTransaction);
    }
    btn.classList.toggle('toggled');
  }

  return (
    <li className={sign === '-' ? 'item minus' : 'item plus'}>
      <div className="transaction-text">
        {transaction.text === '' ? 'UNNAMED' : transaction.text}
      </div>
      <div className="transaction-amount">{sign}${Math.abs(transaction.amount)}</div>
      <div className="transaction-date">{transaction.date}</div>
      
      <button onClick={() => delTransaction(transaction.id)} className="delete-btn">
        <span className="material-icons">clear</span>
      </button>
      <button onClick={(event) => editSelected(event)} className="edit-btn">
        <span className="material-icons">create</span>
      </button>
    </li>
  )
}
