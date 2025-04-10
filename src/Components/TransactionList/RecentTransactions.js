import React, {useEffect, useState} from 'react';
import styles from './RecentTransactions.module.css';
import TransactionCard from '../TransactionCard/TransactionCard';
import Pagination from '../Pagination/Pagination';
import AddExpenses from '../Modal/AddExpenses';

const RecentTransactions = ({transactions, editTransactions, balance, setBalance}) => {
  
  const [editId, setEditId] = useState(0)
  const [isDisplayEditor, setIsDisplayEditor] = useState(false)
  const [currentTransactions, setCurrentTransactions] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const maxRecords = 3;
  const [totalPages, setTotalPages] = useState(0)

  const handleDelete = (id) => {
      const item = transactions.find(i => i.id == id)
      const price = Number(item.amount)
      setBalance(prev => prev + price)

      editTransactions(prev => (
          prev.filter(item => item.id !== id)
      ))
  }

  const handleEdit = (id) => {
    
      setEditId(id)
      setIsDisplayEditor(true  )
  }

  useEffect(() => {

    if(transactions!==null && transactions.length > 0){
      const startIndex = (currentPage - 1) * maxRecords
      const endIndex = Math.min(currentPage * maxRecords, transactions.length)

      setCurrentTransactions([...transactions].slice(startIndex, endIndex))
      setTotalPages(Math.ceil(transactions.length / maxRecords))
    }
  }, [currentPage, transactions])

  // update page if all items on current page have been deleted
  useEffect(() => {

      if(totalPages < currentPage && currentPage > 1){
          setCurrentPage(prev => prev - 1)
      }

  }, [totalPages])
  return (
    
    <div className={styles.transactionContainer}>
      <h2>Recent Transactions</h2>


      {transactions!==null && transactions.length > 0 ?
                <div className={styles.list}>
                    <div>
                        {currentTransactions.map(transaction => (
                            <TransactionCard
                                details={transaction}
                                key={transaction.id}
                                handleDelete={() => handleDelete(transaction.id)}
                                handleEdit={() => handleEdit(transaction.id)}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && (<Pagination updatePage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />)}
                </div>
                : (
                    <div className={styles.emptyTransactionsWrapper}>
                        <p>No transactions!</p>
                    </div>
                )
            }

      <AddExpenses editId={editId} setExpenses={editTransactions} expenseList={transactions} setBalance={setBalance} balance={balance} openModal={isDisplayEditor} setShowModal={setIsDisplayEditor}/>

      
      </div>
  )
}

export default RecentTransactions