import { Button, Card, Grid, TextField } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';
import './log.css'


const Addemp = () => { 
  const [employee, setEmployee] = useState({
     empId:'',
     name: '',
     location: '',
     designation: '' ,
     department:'',
     salary:'',
     imgurl:''
});
 const [errors, setErrors] = useState({});
const navigate = useNavigate();
const location = useLocation();
const isUpdateMode = location.state && location.state.val;
useEffect(() => {
    if (isUpdateMode) {
      setEmployee(location.state.val);
    }
  }, [location]);
 useEffect(() => { const val = location?.state?.val;

  if (val) {
    setEmployee({
      empId: val.empId || '',
      name: val.name || '',
      location: val.location || '',
      designation: val.designation || '',
      department: val.department || '',
      salary: val.salary || '',
      imgurl: val.imgurl || ''
    });
  }
}, [location]);




const validate = () => {
    let newErrors = {};

    if (!employee.empId.trim()) newErrors.empId = 'Employee ID is required';
    if (!employee.empId.trim()) {
  newErrors.empId = 'Employee ID is required';
} else if (!/^EMP\d+$/i.test(employee.empId.trim())) {
  newErrors.empId = 'Employee ID must start with "EMP" followed by numbers (e.g., EMP001)';
}

    if (!employee.name.trim()) { newErrors.name = 'Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(employee.name.trim())) {
  newErrors.name = 'Name must contain only letters and spaces';
}
    if (!employee.location.trim()) {newErrors.location = 'Location is required';
    } else if (!/^[A-Za-z\s]+$/.test(employee.name.trim())) {
  newErrors.location = 'Location must contain only letters and spaces';
}
    if (!employee.designation.trim()) {newErrors.designation = 'Designation is required';
   } else if (!/^[A-Za-z\s]+$/.test(employee.name.trim())) {
  newErrors.designation = 'Designation must contain only letters and spaces';
}
    if (!employee.department.trim()) {newErrors.department = 'Department is required';
     } else if (!/^[A-Za-z\s]+$/.test(employee.name.trim())) {
  newErrors.department = 'Department must contain only letters and spaces';
}
    if (!employee.salary.trim()) {
      newErrors.salary = 'Salary is required';
    } else if (!/^\d+(\.\d+)?\s?LPA$/i.test(employee.salary.trim())) {
      newErrors.salary = 'Enter salary in format like "6 LPA" or "10.5 LPA"';
    }
//     if (!employee.imgurl.trim()) {newErrors.imgurl = 'Image URL is required';
//     } else if (
//   !/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i.test(employee.imgurl.trim())
// ) {
//   newErrors.imgurl = 'Enter a valid image URL ending in .jpg, .jpeg, .png, or .gif';
// }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
  if (!validate()) return;
 const isConfirmed = window.confirm(location.state ? 'Do you want to update this employee?' : 'Do you want to add this employee?');

  if (!isConfirmed) return;

    const val=location?.state?.val;
    if (val) {
      // Edit existing employee
      axiosInstance.put(`/emp/edit/${val._id}`, employee)
        // {location.state.val._id}`, employee)
        .then(res => {
          alert('Employee updated successfully');
          navigate('/emp');
        })
        .catch(err => console.log(err));
    } else {
      // Add new employee
      axiosInstance.post('/emp/add', employee)
        .then(res => {
          alert('Employee added successfully');
          navigate('/emp');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    
    <div className='form-image-container'>
      <div className='add-form'>
      
        <h2 style={{color:'cornflowerblue',fontWeight:'lighter'}}> {isUpdateMode ? 'Update Employee' : 'Add Employee'}</h2>
       
      <Grid container spacing={2} >
        <Grid size={{ xs: 6, md: 8 }}>
          <TextField
            label="Employee ID"
            variant="outlined"
        fullWidth
             error={!!errors.empId}
            helperText={errors.empId}
            color="primary"
            value={employee.empId}
            onChange={(e) => setEmployee({ ...employee, empId: e.target.value })
          }
          
          />
        </Grid>
        <Grid size={{ xs: 6, md: 8 }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
             error={!!errors.name}
            helperText={errors.name}
            color="primary"
            value={employee.name}
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 8 }}>
          <TextField
            label="Location"
            variant="outlined"
         fullWidth
             error={!!errors.location}
            helperText={errors.location}
            color="primary"
            value={employee.location}
            onChange={(e) => setEmployee({ ...employee, location: e.target.value })}
          />
        </Grid>
       <Grid size={{ xs: 6, md: 8 }}>
          <TextField
            label="Designation"
            variant="outlined"
         fullWidth
             error={!!errors.designation}
            helperText={errors.designation}
            color="primary"
            value={employee.designation}
            onChange={(e) => setEmployee({ ...employee,designation: e.target.value })}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 8 }}>
          <TextField
            label="Department"
            variant="outlined"
           fullWidth
             error={!!errors.department}
            helperText={errors.department}
            color="primary"
            value={employee.department}
            onChange={(e) => setEmployee({ ...employee,department: e.target.value })}
          />
        </Grid>

        <Grid size={{ xs: 6, md: 8 }} >
          <TextField
            label="Salary"
            variant="outlined"
          fullWidth
             error={!!errors.salary}
            helperText={errors.salary}
            color="primary"
            value={employee.salary}
            onChange={(e) => setEmployee({ ...employee,salary: e.target.value })}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 8 }} >
          <TextField
            label="ImageURL"
            variant="outlined"
           fullWidth
             error={!!errors.imgurl}
            helperText={errors.imgurl}
            color="primary"
            value={employee.imgurl}
            onChange={(e) => setEmployee({ ...employee,imgurl: e.target.value })}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 8 }}>
          <Button variant="contained"
          onClick={handleSubmit}
           color="primary" 
           size="large">
            {location.state ? 'Update ' : 'Add '}
          </Button>
        </Grid> 
      </Grid>
      </div>
     <div className='imageadd'>
  <img src="/images/addemployee.avif" 
         alt="Employee Illustration"/>

    
  </div>

    </div>
 
  );
}

export default Addemp
