import React, { useEffect, useState } from 'react'
import { Radio, Select, Table } from 'antd';
import"./style.css"
import Searchimg from "../../assets/Search.svg"
import Button from '../Button/Button';
import { parse, unparse } from 'papaparse';

import { toast } from 'react-toastify';

import { Column } from '@ant-design/charts';




function TransactionTable({transactions,addTransaction,fetchTransactions}) {
    const [search,Setsearch]=useState(null);
    const[typeFilter,setTypeFilter]=useState();
    const[sortkey,Setsortkey]=useState();


    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Tag',
          dataIndex:'Tag',
          key: 'Tag',
        },
        {
            title:'Type',
            dataIndex:"type",
            key:"Type"
        },
        {
            title:'Date',
            dataIndex:"date",
            key:"date"
        },
      ];
      let filteredTransactions;
      if(search!=null)
      {
        filteredTransactions=transactions.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase())
        && item.type.includes(typeFilter))
       
      }else{
        filteredTransactions=transactions;
     
      }
      //filtering the results on the table based on search results

      let sortedTransactions=filteredTransactions.sort((a,b)=>
      {
        if(sortkey==="date")
        {
      
            return new Date(a.date)-new Date(b.date)
           
        }else if(sortkey==="amount")
        {
            return a.amount-b.amount
        }else
        {
            return 0
        }
      })



      //creating a function to export our table data
      function exportCSV()
      {
        var csv=unparse(
          {
            fields:["name","type","Tag","date","amount"],
            data:transactions
          })
          const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
          const csvURL = window.URL.createObjectURL(blob);
          let tempLink = document.createElement('a');
          tempLink.href = csvURL;
         tempLink.download="transactions.csv";
         document.body.appendChild(tempLink)
          tempLink.click();
          document.body.removeChild(tempLink)
      }

      function importFromCSV(event)
      {
        event.preventDefault();
        try
        {
          parse(event.target.files[0],
          {
            header:true,
            complete:async function (results)
            {
             for(const trans of results.data)
             {
           
              const newTransaction={
                ...trans,amount:parseInt(trans.amount)
              }
              await addTransaction(newTransaction,true)
             }
            }
          });
          toast.success("All Transactions Added")
          fetchTransactions();
        
        }catch(e)
        {
          toast.error(e.message)
          
        }
      }
      useEffect(()=>
      {
        
      },[sortedTransactions,transactions,addTransaction])
    

   
  return (
  
 
    <div style={{
      width:"95%",
      padding:"0rem 2rem"
    }}>
    <div
    style={{
      display:"flex",
      justifyContent:"space-between",
      gap:"1rem",
      alignItems:"center",
      marginBottom:"1rem"
    }}>
    <div className='input-flex'>
      <img src={Searchimg} width="16"/>
      <input value={search} placeholder='Search By Name' onChange={(e)=>Setsearch(e.target.value)}></input>
    </div>
    
    <Select
    className='select-input'
    onChange={(value)=>setTypeFilter(value)}
    value={typeFilter}
    placeholder="Filter"
  
    allowClear
    >
        <Option value="">All</Option>
        <Option value="income">Income</Option>
        <Option value="expense">Expense</Option>
    </Select>
    </div>
    <div className='my-table'>
      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%",
        marginBottom:"1rem"
      }}>
        <h2>My Transactions</h2>

        <Radio.Group
    className='input-radio'
    onChange={(e)=>Setsortkey(e.target.value)}
    value={sortkey}
    >
    <Radio.Button value="">No Sort</Radio.Button>
    <Radio.Button value="date">Sort By Date</Radio.Button>
    <Radio.Button value="amount">Sort By Amount</Radio.Button>
    </Radio.Group>
    <div style={
      {
        display:"flex",
        justifyContent:"center",
        gap:"1rem",
        width:"400px"
      }}>
        <Button className='btn' text="Export to CSV" onClick={exportCSV}></Button>
        <label htmlFor="file-csv" className='btn btn-blue'>Import from CSV</label>
        <input type="file" id='file-csv' accept='.csv' onChange={importFromCSV} required style={{display:"none"}} />
      
         

    </div>
  
      </div>
   
   
        <Table dataSource={ [...sortedTransactions]} columns={columns}></Table>
    </div>
    </div>
   
  )
}

export default TransactionTable;