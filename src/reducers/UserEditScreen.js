import React, { useEffect, useState } from 'react'

import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../action/userAction';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { USER_UPDATE_RESET } from '../constants/userConstant';

const UserEditScreen = () => {
  const userId =useParams().id
  const history = useNavigate()

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [isAdmin,setIsAdmin] = useState(false)
  

  const dispatch = useDispatch()

  const {loading,error,user} = useSelector(state=>state.userDetails)

  const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = useSelector(state=>state.userUpdate)


  useEffect(()=>{
    if(successUpdate){
        dispatch({type:USER_UPDATE_RESET})
        history("/admin/users")
    }else{
       if(!user.name || user._id !== userId){
            dispatch(getUserDetails(user.Id))
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }   
    }
  },[user,dispatch,userId,successUpdate,history])

  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(updateUser({_id:userId,name,email,isAdmin}))
  }
  
  return (
    <>
        <Link to="/admin/users" className='btn btn-light my-3'>
            Go Back
        </Link>
    
    <FormContainer>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader/>}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? <Loader/> : error ?<Message variant="danger">{error}</Message>:(
      <Form onSubmit={submitHandler} >
      <Form.Group controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control placeholder='enter your name' type='name' onChange={(e)=>setName(e.target.value)} value={name}/ >
      </Form.Group>
        <Form.Group controlId='emailId'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control placeholder='enter your email address' type='email' onChange={(e)=>setEmail(e.target.value)} value={email}/ >
        </Form.Group>
        <Form.Group controlId='isAdmin'>
            <Form.Check
                type="checkbox"
                label="is Admin"
                checked={isAdmin}
                onChange={(e)=>setIsAdmin(e.target.checked)}>
            </Form.Check>

        </Form.Group>
        <Button type="submit" variant="primary">
          Update
        </Button>
      </Form>
      )}
    </FormContainer>  
    </>
  )
}

export default UserEditScreen
