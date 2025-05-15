import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './log.css'
import { alertClasses, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import axiosInstance from '../axiosInterceptor'


const Login = () => { const [form,setForm]=useState({
    role:'',
    email:'',
    password:'',
  })
const navigate=useNavigate();
const [loginError, setLoginError] = useState('');


 const validate = () => {
    const newErrors = {};
    if (!form.role) newErrors.role = 'Role is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };
  const capValue = () => {
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  axios.post('/api/user/login',form)
  .then(res=>{
   alert(res.data.meassage||'login successfully')
   if(res.data.jtoken){
    localStorage.setItem('logintoken',res.data.jtoken)
    localStorage.setItem('userRole',res.data.role)
   
   navigate('/emp')}
else{
  
        setLoginError('Invalid email or password');
}
  })
  .catch(err=>{

     setLoginError('Invalid email or password');
    alert(err)
    navigate('/')

  })}
  return (
    
   
 
     <div className=" login-container"> 
    <div className="image-section">
    <h2 style={{color:'cornflowerblue'}}> Welcome New Talent with Precision</h2>
                 <img src="/images/login.avif" 
         alt="Employee Illustration"/>
   
</div> 
    <div className="form-section">

    <Card className="login-card" >
          <CardContent>
            <Typography variant="h5" component="div" color='primary' gutterBottom align="center" style={{fontFamily:'-moz-initial'}}>
              LOGIN
            </Typography>
   
         <FormControl
          fullWidth sx={{ mb: 2 }}>
  <InputLabel id="role-label">Role</InputLabel>
  <Select
    labelId="role-label"
    id="role"
    name="role"
    value={form.role}
    label="Role"
    onChange={(e) => setForm({ ...form, role: e.target.value })}
    sx={{ borderRadius: '10px', fontFamily: 'Segoe UI', borderColor: 'blue' }}
  >
    <MenuItem value="">Select Role</MenuItem>
    <MenuItem value="admin">Admin</MenuItem>
    <MenuItem value="user">User</MenuItem>
  </Select>
</FormControl>

  
<TextField 

fullWidth
 label="Email"
  variant="outlined"
   name='email' 
   color="info"
   margin='normal'
   onChange={(e)=>{setForm({...form,email:e.target.value})}}/>
   <br></br>
   <TextField 
   
    fullWidth 
    label="Password"
     variant="outlined" 
     color='info'
      name='password' onChange={(e)=>{setForm({...form,password:e.target.value})}}/>
<br></br>
{loginError && (
  <Typography color="error" align="center" variant="body2" sx={{ mt: 1 }}>
    {loginError}
  </Typography>
)}
  <Button variant="outlined"
   color='primary'
   size='medium'
   style={{marginTop:'20px'}}

    onClick={capValue}>LOGIN</Button>


  </CardContent>
  </Card>
 
</div>

</div>

 
  )
}

export default Login












