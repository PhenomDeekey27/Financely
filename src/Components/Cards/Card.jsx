import React, { useEffect } from 'react'
import"./Styles.css"
import { Row,Card} from 'antd';
import Button from '../Button/Button';
import { deleteDoc,doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase';

function Cards({showExpenseModal,showIncomeModal,income,Totalbalance,expense}) {
  const[user]=useAuthState(auth)
  async function Reset(transaction)
  {
    try
    {
      await deleteDoc(doc(db,`users/${user.uid}/transactions`),transaction);
     
      console.log("reset")


    }catch(e)
    {
      console.error(e.message)
    }

  }
 

  
  return (
    <div>
        <Row className='my-row'>
        <Card title="Current-Balance" className='my-card'>
            <p>₹{Totalbalance}</p> 
            <Button text={"Reset Balance"} blue={true} onClick={Reset}></Button>
          
        </Card>
        <Card title="Total-Income" className='my-card'>
            <p>₹{income}</p> 
            <Button text={"Add Income"} blue={true} onClick={()=>showIncomeModal()}></Button>
          
        </Card>
        <Card title="Total-Expense" className='my-card'>
            <p>₹{expense}</p> 
            <Button text={"Add Expense"} blue={true} onClick={()=>showExpenseModal()}></Button>
          
        </Card>
        </Row>

    </div>
  )
}

export default Cards