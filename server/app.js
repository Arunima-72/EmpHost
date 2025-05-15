const express = require('express');
const morgan=require('morgan')
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./db/connection');

const emproutes=require('./routes/empRoutes')
const userroutes=require('./routes/userRoutes')

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/emp',emproutes);
app.use('/user',userroutes);



app.listen(4000, () => {
    console.log(`Server is running on port 4000`);
});