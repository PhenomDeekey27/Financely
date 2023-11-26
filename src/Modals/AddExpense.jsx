import { Button,Modal,Form,Input,DatePicker,Select } from "antd";
import React from 'react'

function AddExpenseModal({ExpenseModalVisible,handleExpenseCancel,onFinish}) 
{
    const[form]=Form.useForm();
  return (

    <Modal title="Add Expense" visible={ExpenseModalVisible} onCancel={handleExpenseCancel} footer={null}>
         <Form form={form} layout="vertical" onFinish={(values)=>{onFinish(values,"expense");form.resetFields()}}>
         <Form.Item label="Name" name="name" rules={[
            {
                required:true,
                message:'Please input the name of the transaction!'
            }
         ]}>
             <Input type="text" className="custom-input"/>
         </Form.Item>
         <Form.Item label="Amount" name="Amount" rules={[
            
            {
                required:true,
                message:"Please input the amount of the transaction!"
            }
         ]}>
            <Input type="number" className="custom-input"></Input>
         </Form.Item>
         <Form.Item label="Date" name="date" rules={[
            
            {
                required:true,
                message:"Please select the expense Date!"
            }
         ]}>
            <DatePicker className="custom-input" format="YYYY-MM-DD"></DatePicker>
           
         </Form.Item>
         <Form.Item label="Tag" name="Tag"
            rules={[
               {
                  required:true, message:"Please Select a Tag"
               }
            ]}

         >
            <Select className="select-input-2">
               <Select.Option value="food">Food</Select.Option>
               <Select.Option value="education">Education</Select.Option>
               <Select.Option value="Office">Office</Select.Option>
            </Select>

         </Form.Item>
         <Form.Item>
            <Button className="btn btn-blue" type="primary" htmlType="submit">Add Expense</Button>
         </Form.Item>
         </Form>
        
    </Modal>
   
  )
}

export default AddExpenseModal;
