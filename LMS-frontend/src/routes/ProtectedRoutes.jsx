import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { AuthContext } from '../context/AuthContext'
import Loader from '../components/common/Loader'



const ProtectedRoutes = () => {
    const {user, loading} = useContext(AuthContext)
    
  
  if (loading)
  {
    return <Loader/>
  }

    if( user ) {
      return <Outlet/>
    } else {
        return <Navigate to="/login" replace/>
  }
}

export default ProtectedRoutes
