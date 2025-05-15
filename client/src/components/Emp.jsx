import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInterceptor';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './log.css'

const Emp = () => {
  const [employees, setEmployees] =useState([]);
 const navigate=useNavigate()
   const role = localStorage.getItem('userRole');

  useEffect(() => {
    axiosInstance.get('/emp/get')
      .then(res => setEmployees(res.data))
      .catch(error => console.log('Error fetching employees:', error));
  }, []);

  const updateData=(emp)=>{
     if (role === 'admin') {
    navigate('/add',{state:{val:emp}})
  } else {
      alert('Access Denied: Only admin can update employees!');
    }
  };
  const deleteData = (empId) => {
      if (role === 'admin') { const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmDelete) return;

    axiosInstance.delete(`/emp/delete/${empId}`)
      .then(() => {
        alert('Employee deleted successfully');
        setEmployees(prevEmployees => prevEmployees.filter(emp => emp._id !== empId));
      })
      .catch((error) => console.log('Error deleting employee:', error));
     } else {
      alert('Access Denied: Only admin can delete employees!');
    }
  };



  return (
    <div>
       <h2 style={{color:'',textAlign:'justify', fontFamily:'inherit' }} >Employee Directory</h2> 
       <p style={{fontFamily:'-moz-initial',color:'GrayText'}} className="subtitle"> * Only authorized users (employers/admins) can add, update, or delete employee records. Employees can view details only.</p>
       <br></br>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px' }}></div>

      <Grid container spacing={2}>
  {employees.map((Emp) => (
    <Grid item xs={12} sm={6} md={4} key={Emp._id}>
      <Card sx={{  
          height: '100%',
          boxShadow: 6,
          borderRadius: 3,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: 10,
          },}}>
        <CardMedia
          sx={{ height:270,width:240 }}
          image={Emp.imgurl}
          title={Emp.empId}/>
        <CardContent>
            
          <Typography gutterBottom variant="h5" component="div" sx={{ color: 'text.primary' ,fontFamily:'-moz-initial'}} >
            {Emp.name}
          </Typography>
          <Typography gutterBottom  variant="body2" sx={{ fontFamily:'-moz-initial'}} >
            ID:{Emp.empId}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily:'-moz-initial'}}>
           Location: {Emp.location}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily:'-moz-initial'}}>
             Designation: {Emp.designation}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily:'-moz-initial'}} >
            Department: {Emp.department}
            </Typography>
            <Typography variant="body2" sx={{fontFamily:'-moz-initial'}}>
            Salary: {Emp.salary}
          </Typography>
         
        </CardContent>
        {role === 'admin' && (
        <CardActions>
          <Button  className='btn1' size="small"
          //  color='info' 
           variant='contained'
            onClick={()=>{ updateData(Emp)}}>
              Update</Button>
          <Button className='btn2'
           size="small"
            color='inherit' 
            onClick={()=>{deleteData(Emp._id)}} 
            variant='contained'>
              Delete</Button>
        </CardActions>
        )}
      </Card>
    </Grid>
  ))}
</Grid>

      
    </div>
  )
}

export default Emp
