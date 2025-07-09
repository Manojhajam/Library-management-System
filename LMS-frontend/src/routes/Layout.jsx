import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router'

const Layout = () => {
  return <div>
      <Sidebar />
      <div className="ml-[250px]">
        <Outlet />
      </div>
    </div>;
}

export default Layout
