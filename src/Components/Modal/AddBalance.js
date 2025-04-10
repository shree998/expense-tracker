import React, { useState } from 'react'
import ReactModal from 'react-modal';
import styles from './Modal.module.css'
const AddBalance = ({ openModal, setShowModal, setBalance }) => {
  const [amount, setAmount] = useState('');

  const handleAddBalance = (e) => {
    
    let currentBalance = parseInt(localStorage.getItem('balance'));
    let updatedBalance = currentBalance + parseInt(amount);
    localStorage.setItem('balance', updatedBalance);
    setBalance(updatedBalance)
    e.preventDefault();
    setShowModal(false)
  }

  return (
    <div>
      <ReactModal
        isOpen={openModal}
        style={{
      
          content: {
            width : '95%',
            maxWidth: '572px',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            height: 'fit-content',
            maxHeight: '90vh',
            background : 'rgba(239, 239, 239, 0.85)',
            border: '0',
            borderRadius : '15px',
            padding:'2rem',
          }
        }}
      >

        <h2 style={{
          fontFamily: "Ubuntu", fontWeight: "700px", fontSize: "30px",
          lineHeight: "100%",
          letterSpacing: "0%"
        }}>Add Balance</h2>
        <form className={styles.modal}>
          <input onChange={(e)=> {setAmount(e.target.value)}} type="number" placeholder="Income Amount" required />
          <button 
          type='submit' 
          style=
          {{ backgroundImage: "linear-gradient(0deg, #D9D9D9, #F4BB4A, #F4BB4A)", color: " #FFFFFF" }}
          onClick={(e)=>handleAddBalance(e)}
          >Add Balance</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </form>

      </ReactModal>
    </div>
  )
}

export default AddBalance
