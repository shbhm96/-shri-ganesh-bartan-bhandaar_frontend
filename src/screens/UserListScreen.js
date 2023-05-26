import React, { useEffect } from 'react'

import { Button,Table } from 'react-bootstrap';
import { Link, useNavigate, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userDelete, usersList } from '../action/userAction';
import Message from '../components/Message';
import Loader from '../components/Loader';

const UserListScreen = () => {
    const dispatch = useDispatch()

    const {loading,error,users} = useSelector(state => state.usersList)
    const {userInfo} = useSelector(state=>state.userLogin)
    const {success:successDelete,loading:deleteLoading,error:deleteError} = useSelector(state => state.userDelete)
    const history = useNavigate()

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(usersList())
        }
        else{
            history("/login")
        }
    },[dispatch,history,successDelete,userInfo])

    const deleteHandler = (id) =>{
        if(window.confirm("Are you sure")){
            dispatch(userDelete(id))
        }
    }


  return (
    <>
        <h1>Users</h1>
        {deleteLoading && <Loader/>}
        {deleteError && <Message variant="danger">{deleteError}</Message>}
        {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message>:(
            <Table striped hover bordered responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>EMail</th>
                        <th>Admin</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user=>{
                        return <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>{user.isAdmin ? <i className='fas fa-check' style={{color:"green"}}></i>:
                            <i className='fas fa-times' style={{color:"red"}}></i>}</td>
                            <td>
                                <Link to={`/admin/user/${user._id}/edit`}>
                                    <Button variant="light" className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </Link>
                                <Button variant='danger' className='btn-sm' onClick={()=>
                                deleteHandler(user._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    })}
                </tbody>

            </Table>
        )}
    </>
  )
}

export default UserListScreen
