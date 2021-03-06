import React, {useState, useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { v4 } from 'uuid';
import { NavLink } from 'react-router-dom';


export const AddTransaction = () => {
  const dt = new Date();
  const currentMonth = dt.getMonth() < 9 ? `0${dt.getMonth() + 1}` : `${dt.getMonth() + 1}`;
  const currentDay = dt.getDate() < 10 ? `0${dt.getDate()}` : `${dt.getDate()}`;

  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(() => {
    return `${dt.getFullYear()}-${currentMonth}-${currentDay}`;
  });

  const { addTransaction } = useContext(GlobalContext);
  const onSubmit = e => {
    e.preventDefault();
    
    if ( ['0', 0].includes(amount) ) {
      document.querySelector('.amount-field p').style.display = 'block';
      setTimeout((() => {
        document.querySelector('.amount-field p').style.display = 'none'
      }), 2000);
      return;
    } else {
      document.querySelector('.amount-field p').style.display = 'none';
      const newTransaction = {
        id: v4(),
        text,
        amount: +amount,
        date: date
      }
      addTransaction(newTransaction);
    }
  }

  return (
    <>
      <form className="add-action" onSubmit={onSubmit}>
        <div className="text-field">
          <label htmlFor="text">NAME</label>

          <input type="text" value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Enter text..."               
          />
        </div>
        <div className="amount-date-wrapper">
          <div className="amount-field">
            <label htmlFor="amount">AMOUNT</label>

            <input type="number" value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              placeholder="Enter amount..." 
            />

            <p>Required</p>
          </div>
          <div className="date-field">
            <label htmlFor="date">DATE</label>

            <input type="date" value={date} 
              min={`${dt.getFullYear()}-01-01`} 
              max={`${dt.getFullYear()}-12-31`} 
              onChange={(e) => setDate(e.target.value)} 
            />
          </div>
        </div>
        <div className="form-btn">
          <button className="btn">
            <span className="btn-add">ADD</span>
            <span className="btn-check">&#10003;</span>
          </button>
        </div>
      </form>

      <nav className="navbar">
        <NavLink to="/">Past Transactions</NavLink>
        <NavLink to="/chart">Chart</NavLink>
      </nav>
    </>
  )
}
