
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import { useEffect, useState } from 'react';
import { SnackbarProvider } from 'notistack';

function App() {

  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `Expense Tracker`;
    if(localStorage.getItem('balance') === null){
      localStorage.setItem('balance', 5000);
      setBalance(5000);
      return;
    }else{
      setBalance(parseInt(localStorage.getItem('balance')));
     
    }


    const expenses = JSON.parse(localStorage.getItem('expenses'))

    setExpenses(expenses || []);
    setIsMounted(true)


  }
  , []);

  
  useEffect(() => {
    //  
   
    if (expenses.length > 0 || isMounted) {
      debugger
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }
  , [expenses]);


  useEffect(() => {
    //  
   
    if (isMounted) {
     
      localStorage.setItem("balance", balance);
    }
  }
  , [balance]);


  return (
    <SnackbarProvider >
         <div className="App">
      <header className="App-header">
    
      <Dashboard balance={balance} setBalance={setBalance} setExpenses={setExpenses} expenses={expenses}/>
      </header>
    </div>
    </SnackbarProvider>
   
  );
}

export default App;
