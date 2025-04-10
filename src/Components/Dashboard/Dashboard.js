import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css'
import Chart from '../PieChart/Chart';
import Card from '../Card/Card';
import AddBalance from '../Modal/AddBalance';
import AddExpenses from '../Modal/AddExpenses';
import Trends from '../BarChart/Trends';
import RecentTransactions from '../TransactionList/RecentTransactions';

function Dashboard({ balance, expenses, setBalance, setExpenses }) {

  const [showModal, setShowModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [categorySpends, setCategorySpends] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });

  useEffect(() => {
    let foodSpends = 0,
    entertainmentSpends = 0,
    travelSpends = 0;

  expenses.forEach((item) => {
    if (item.category === "Food") {
      foodSpends += Number(item.amount);
    } else if (item.category === "Entertainment") {
      entertainmentSpends += Number(item.amount);
    } else if (item.category === "Travel") {
      travelSpends += Number(item.amount);
    }
  });

  setCategorySpends({
    food: foodSpends,
    travel: travelSpends,
    entertainment: entertainmentSpends,
  });
  }, [ expenses]);

  useEffect(() => {
    setChartData([
      {
        name: "Food",
        value: categorySpends.food,
      },
      {
        name: "Travel",
        value: categorySpends.travel,
      },
      {
        name: "Entertainment",
        value: categorySpends.entertainment,
      }
    ])

  }, [categorySpends]);

  useEffect(() => {
  },[chartData])

  return (
    <div className={styles.dashboardContainer}>
      <h1>Expense Tracker</h1>
      <div className={styles.dashboard}>
        <Card title="Wallet Balance" money={balance} buttonText="+Add Income" buttonType="btn-success" handleClick={() => setShowModal(true)} />

        <Card title="Expenses" success={false} money={expenses == null ? 0 : expenses !== null && expenses.reduce((acc, current) => acc + parseInt(current.amount), 0)} buttonText="+Add Expenses" buttonType="btn-failure" handleClick={() => { setShowExpenseModal(true) }} />

        <Chart data={chartData} />
      </div>
      <AddBalance openModal={showModal} setShowModal={setShowModal} setBalance={setBalance} />
      <AddExpenses openModal={showExpenseModal} setShowModal={setShowExpenseModal} setExpenses={setExpenses} setBalance={setBalance} balance={balance}/>
      <div className={styles.transactionWrapper}>
     <RecentTransactions setShowExpenseModal={setShowExpenseModal} transactions={expenses} editTransactions={setExpenses} balance={balance} setBalance={setBalance} />
      <Trends data={chartData} />
      </div>
    </div>
  )
}

export default Dashboard
