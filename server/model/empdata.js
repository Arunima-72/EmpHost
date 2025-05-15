const mongoose = require('mongoose');

const employeeSchema =mongoose.Schema({
    empId:String,
    name:String,
    location:String,
    designation:String,
    department:String,
    salary:String,
    imgurl:String



    
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;