import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './log.css'
const Nav = () => {
   const navigate = useNavigate();

  const handleAddClick = () => {
    const role = localStorage.getItem('userRole'); 
    if (role === 'admin') {
      navigate('/add');
    } else {
      alert('Access Denied: Only admin can add employees!');
    }
  };
const handleLogout = () => {
    localStorage.removeItem('logintoken');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
      <Box sx={{ flexGrow: 1 ,backgroundColor:'info' }}>
      <AppBar color='white' position="static"  >
      <Toolbar>
      
        <Typography  variant="h4" component="div"  sx={{ flexGrow: 1 ,fontFamily:'-moz-initial',color:'cornflowerblue'}}>
      Employee App
        </Typography> 

          

        <Link
         to= {'/emp'}>
          <Button style={{color:'cornflowerblue', fontFamily:'inherit'}}>Employees</Button></Link>
        
        <Link to={'/add'}> 
        <Button style={{color:'cornflowerblue', fontFamily:'inherit'}} 
        onClick={handleAddClick}
  
        >Add Employess</Button></Link>
    
             
        <Link to={'/'}> <Button style={{color:'cornflowerblue', fontFamily:'inherit'}} onClick={handleLogout}
 
        >log out</Button></Link>
           
        </Toolbar>
    </AppBar>
  </Box>
   
  
  )
}

export default Nav
