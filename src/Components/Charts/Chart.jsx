import React from 'react';
import { Line, Pie } from '@ant-design/charts';



const Page = ({sortedTransactions}) => {
 
 const data=sortedTransactions.map((item)=>{
  return {date:item.date,amount:item.amount}
 })
 const spendingData=sortedTransactions.filter((trans)=>{if(trans.type==="expense")
 return{
  tag:trans.tag,amount:trans.amount
 }
})

  const config = {
    data,
    xField: 'date',
    yField: 'amount',
  }
 

  
    
    
  

  return(
    <div className='charts-wrapper'>
     <h2 style={{textAlign:"center"}}>Your Analytics</h2>
     <Line {...config}></Line>
   </div>
  )
};
export default Page;