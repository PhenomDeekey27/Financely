import React, { useEffect } from 'react';
import { Line, Pie } from '@ant-design/charts';



const Page = ({sortedTransactions}) => {
 
 let data = sortedTransactions.map((item)=>{
  return {date:item.date,amount:item.amount}
 })


  const config = {
    data,
    xField: 'date',
    yField: 'amount',
  }
 

  useEffect(()=>
  {

  },[sortedTransactions])
    
    
  

  return(
    <div className='charts-wrapper'>
     <h2 style={{textAlign:"center"}}>Your Analytics</h2>
     <Line {...config}></Line>
   </div>
  )
};
export default Page;