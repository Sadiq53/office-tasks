import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { handleGetAllData } from '../redux/AdminDataSlice';

const AdminModule = () => {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(handleGetAllData())
    }, [])

  return (
    <Outlet />
  )
}

export default AdminModule

