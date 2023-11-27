import React, { useEffect } from 'react'
import"./Styles.css"
import { Row,Card} from 'antd';
import Button from '../Button/Button';


function Cards({showExpenseModal,showIncomeModal,income,Totalbalance,expense,Reset}) {
 
  return (
    <div>
        <Row className='my-row'>
        <Card title="Current-Balance" className='my-card'>
            <p>₹{Totalbalance}</p> 
            <Button text={"Reset Balance"} blue={true} onClick={()=>Reset()}></Button>
          
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