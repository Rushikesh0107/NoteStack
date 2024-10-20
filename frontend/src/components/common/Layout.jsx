import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../core/Header/Header'

const Layout = () => {
  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}

export default Layout