import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'

import Cards from '../Components/Cards/Card'
import AddExpenseModal from '../Modals/AddExpense'
import AddIncomeModal from '../Modals/AddIncome'

import { addDoc, collection, getDocs, query } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import { toast } from 'react-toastify'
import TransactionTable from '../Components/TransactionsTable/TransactionTable'
import Page from '../Components/Charts/Chart'
import { deleteDoc,doc } from 'firebase/firestore'


function Dashboard() {
  const[ExpenseModalVisible,SetExpenseModalVisible]=useState(false)
  const[IncomeModalVisible,SetIncomeModalVisible]=useState(false)
  // these 2 set the state of displaying modal for both income and expense
  const[user]=useAuthState(auth)
  //we are getting the use from the auth in the firebase

  let[transactions,Settransactions]=useState([])
  //we use these array to get the values from the firebase that we have updated earlier
  const[loading,Setloading]=useState(false)

  const[income,Setincome]=useState(0)
  const[expense,Setexpense]=useState(0)
  const[Totalbalance,SetTotalBalance]=useState(0)
 
  const showExpenseModal=()=>
  {
    SetExpenseModalVisible(true);
  }
  const showIncomeModal=()=>
  {
    SetIncomeModalVisible(true);
  }
  const handleExpenseCancel=()=>
  {
    SetExpenseModalVisible(false)
  }
  const handleIncomeCancel=()=>
  {
    SetIncomeModalVisible(false)
  }
  const onFinish=(values,type)=>
  {
   
    const newTransaction=
    {
      type:type,
      date:values.date.format("YYYY-MM-DD"),
      amount:parseFloat(values.Amount),
      Tag:values.Tag,
      name:values.name
    }

    addTransaction(newTransaction)
  }
  async function addTransaction(transaction,many)
  {
    try
    {
      const docRef=await addDoc(
        collection(db,`users/${user.uid}/transactions`),transaction
      );
      
      if(!many)toast.success('Transaction Added')
      let newArr=transactions;
      newArr.push(transaction)
      Settransactions(newArr);
      calculateBalance();
      //for updating the live transaction on the display
      
    }catch(e)
    {
    
      if(!many)toast.error("Couldn't Add Transaction")
    }

    
  }


  useEffect(()=>
  {
    fetchTransactions();
    //using useEffect to display the data in the page if there are any transactions are found in the firebase
    

  },[user])

useEffect(()=>
{
  calculateBalance();

},[transactions])



const calculateBalance=()=>
{
  let incomeTotal=0;
  let expensetotal=0;
  transactions.forEach((transaction)=>
  {
    if(transaction.type === "income")
    {
      incomeTotal+=transaction.amount
    }else
    {
      expensetotal+=transaction.amount
    }
  });
  Setincome(incomeTotal);
  Setexpense(expensetotal);
  SetTotalBalance(incomeTotal-expensetotal)
}

  //function for fetching the data from the firebase
  async function fetchTransactions()
  {
    Setloading(true);
    if(user)
    {
      const q=query(collection(db,`users/${user.uid}/transactions`));
      const querySnapshot=await getDocs(q);
      let transactionsArray=[];
      querySnapshot.forEach((doc)=>
      {
        transactionsArray.push(doc.data())
      })
      Settransactions(transactionsArray);
    
      toast.success("Transactions Fetched")
    }
    Setloading(false)

  }
  let sortedTransactions=transactions.sort((a,b)=>
  {
    return new Date(a.date)-new Date(b.date)
  })
  function Reset()
  {
    SetTotalBalance(0)
    Settransactions([])
  }

 

 


  return (
    <div>
      <Header></Header>
   
     {loading ? (<p>Loading....</p> ): <>
      <Cards 
      showExpenseModal={showExpenseModal} showIncomeModal={showIncomeModal}
      income={income}
      expense={expense}
      Totalbalance={Totalbalance}
      Reset={Reset}
     
     
     

      ></Cards>
      {transactions.length!=0 ? <Page sortedTransactions={sortedTransactions}/>:<h2 style={{textAlign:"center"}}>No Active Transactions</h2>}
    
     <AddExpenseModal  ExpenseModalVisible={ExpenseModalVisible} handleExpenseCancel={handleExpenseCancel} onFinish={onFinish} ></AddExpenseModal>
     <AddIncomeModal IncomeModalVisible={IncomeModalVisible} handleIncomeCancel={handleIncomeCancel} onFinish={onFinish}></AddIncomeModal>
     <TransactionTable transactions={transactions} addTransaction={addTransaction} fetchTransactions={fetchTransactions}></TransactionTable>
      </>
        }
    
    </div>
  )
}

export default Dashboard