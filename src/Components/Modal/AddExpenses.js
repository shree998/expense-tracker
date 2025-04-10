import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal';
import styles from './Modal.module.css'
import { useSnackbar } from 'notistack';

const AddExpenses = ({ openModal, setShowModal, setExpenses, setBalance, editId, expenseList, balance }) => {
  console.log('openExpensesModal', openModal)
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  
  const { enqueueSnackbar } = useSnackbar();
  // const [chartData, setChartData] = useState([]);

  const handleAddExpense = (e) => {
    e.preventDefault();

    let currentExpenseList = JSON.parse(localStorage.getItem('expenses'));
    const lastId = (currentExpenseList !== null && currentExpenseList.length > 0) ? currentExpenseList[currentExpenseList.length-1].id : 0
    let updatedExpenseList = currentExpenseList !== null ? [...currentExpenseList, { title, amount, category, date, id: lastId + 1 }] : [{ title, amount, category, date, id: lastId + 1 }];
    if (Number(amount) > balance) {
      enqueueSnackbar("Price should be less than the wallet balance", { variant: "warning" })
      setShowModal(false)
      return;
    }
    localStorage.setItem('expenses', JSON.stringify(updatedExpenseList));
    localStorage.setItem('balance', balance - Number(amount));

    setBalance(balance - amount)
    setExpenses(updatedExpenseList)


    setShowModal(false)

  }

  const handleEditExpense = (e) => {
    debugger
    e.preventDefault();
    const updated = expenseList.map(item => {
      debugger
      if (item.id === editId) {

        const priceDifference = item.amount - Number(amount)

        if (priceDifference < 0 && Math.abs(priceDifference) > balance) {
          enqueueSnackbar("Price should not exceed the wallet balance", { variant: "warning" })
          setShowModal(false)
          return { ...item }
        }

        setBalance(prev => prev + priceDifference)
        return { ...{amount, title, category, date}, id: editId } 


      }
      else {
        return item
      }
    })

    setExpenses(updated)

    setShowModal(false)
  }

  useEffect(() => {

    if (editId) {
      const expenseData = expenseList.find(item => item.id === editId)

      setTitle(expenseData.title)
      setCategory(expenseData.category)
      setAmount(expenseData.price)
      setDate(expenseData.date)


    }

  }, [editId])


  return (
    <div>
      <ReactModal
        isOpen={openModal}
        style={{
          content: {
            width: '95%',
            maxWidth: '572px',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            height: 'fit-content',
            maxHeight: '90vh',
            background: 'rgba(239, 239, 239, 0.85)',
            border: '0',
            borderRadius: '15px',
            padding: '2rem',

          }
        }}
      >

        <h2 style={{
          fontFamily: "Ubuntu", fontWeight: "700px", fontSize: "30px",
          lineHeight: "100%",
          letterSpacing: "0%"
        }}>{editId ? "Edit Expense" : "Add Expenses"}</h2>
        <form className={styles.expenseModal}>
          <div style={{ display: 'flex', justifyContent: 'start', gap: '10px' }}>
            <input name='title' onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder="Title" required />
            <input name='price' onChange={(e) => { setAmount(e.target.value) }} type="number" placeholder="Price" required />
          </div>
          <div style={{ display: 'flex', justifyContent: 'start', gap: '10px' }}>
          <select name="category"
                    value={category}
                    onChange={(e) => { setCategory(e.target.value) }}
                    required
                >
                    <option value='' disabled>Select category</option>
                    <option value='Food'>Food</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Travel">Travel</option>
                </select>
            {/* <input list='category' onChange={(e) => { setCategory(e.target.value) }} type="" placeholder="Select Category" required />
            <datalist id="category">
              <option value="Food" />
              <option value="Travel" />
              <option value="Entertainment" />
            </datalist> */}
            <input name='date' onChange={(e) => { setDate(e.target.value) }} type="date" placeholder="dd/mm/yyy" required />

          </div>
          <div style={{ display: 'flex', justifyContent: 'start', gap: '10px' }}>
            <button
              type='submit'
              style=
              {{
                backgroundImage: "linear-gradient(0deg, #F4BB4A, #F4BB4A), linear-gradient(0deg, #F4BB4A, #F4BB4A), linear-gradient(0deg, #F4BB4A, #F4BB4A)",
                color: "#FFFFFF"
              }}
              onClick={(e) => editId ? handleEditExpense(e) : handleAddExpense(e)}
            >{editId ? "Edit Expense" : "Add Expense"}</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>

        </form>

      </ReactModal>
    </div>
  )
}

export default AddExpenses

