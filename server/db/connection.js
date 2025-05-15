const mongoose=require('mongoose');
require('dotenv').config()
// connecting db
mongoose.connect('mongodb+srv://Arunima:Arunima72@cluster0.dwfhkqr.mongodb.net/EmployeeDb?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('Connection established')
}).catch(()=>{
console.log('connection error')
})