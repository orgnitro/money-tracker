import './App.css';
import { Header } from './components/Header';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { ChartComponent } from './components/Chart';
import { GlobalProvider } from './context/GlobalState';
import { HashRouter, Route } from 'react-router-dom';


function App() {
  return (
    <HashRouter>
      <GlobalProvider>
      <Header />
      <div className="container">
        <IncomeExpenses />
        <AddTransaction />
        <Route exact path='/' component={TransactionList} />
        <Route path='/chart' component={ChartComponent} />
      </div>
      </GlobalProvider>
    </HashRouter>
  );
}

export default App;
