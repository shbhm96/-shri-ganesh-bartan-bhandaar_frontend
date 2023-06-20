import React, { useEffect } from 'react'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { amountPaid, getAllOrdersList, orderDelivered } from '../action/orderAction'

const OrdersListScreen = () => {
    let sno = 0
    const {error,loading,allOrders} = useSelector(state=>state.getAllOrdersList)
    const {success} = useSelector(state=>state.amountPaid)
    const {success:deliverSuccess} = useSelector(state=>state.orderDelivered)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getAllOrdersList())
    },[dispatch,success,deliverSuccess])

    const paidHandler= (id,price) =>{        
        if(window.confirm("Paid amount? \n"+ price)){
            dispatch(amountPaid(id))
        }
    }

    const deliveredHandler= (id,price) =>{        
        if(window.confirm("Order Delivered? \n"+ price)){
            dispatch(orderDelivered(id))
        }
    }

  return (
    <>
    <h2>My Orders</h2>
    {loading && <Loader/>}
    {error ? <Message variant="danger">{error}</Message>:(
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Id</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th> 
            <th>DELIVERED</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {console.log("order kya hai",allOrders)}
          {allOrders && allOrders.map((order)=>{
            return <tr key={order._id}>
                <td>{sno=sno+1}</td>
              <td>{order._id}</td>
              <td>{order.createdAt.toString().substring(0,10)}</td>
              <td>{order.totalPrice}</td>
              <td>{order.isPaid ? <i className='fas fa-check' style={{color:'green'}}></i> : (
                <>
                    <i className='fas fa-times' style={{color:'red'}}></i>
                    <Button variant="success" className='btn-block btn-sm' onClick={()=>paidHandler(order._id,order.totalPrice)}>
                        Paid</Button>
                </>

                
              )} </td>
              <td>
                {order.isDelivered ? order.isDelivered.toString().substring(0,10):(
                  <>
                    <i className='fas fa-times' style={{color:'red'}}></i>
                    <Button variant="success" className='btn-block btn-sm' onClick={()=>deliveredHandler(order._id,order.totalPrice)}>
                        Delivered</Button>
                  </>
                )}
              </td>
              <td>
                <Link to={`/order/${order._id}`}>
                  <Button variant="light" className='btn-block btn-sm'>Details</Button>
                </Link>
              </td>
            </tr>
          })}
        </tbody>

        </Table>
    )}
    </>
  )
}


export default OrdersListScreen
