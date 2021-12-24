const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan')
const app = express();
const URL = "mongodb://useradmin:pwdadmin@localhost:27017/inventorydb?retryWrites=true&w=majority";

const PORT  = 3000 || process.env.PORT

const store = require('./routes/store');
const user = require('./routes/user');
const attributes = require('./routes/attributes');
const brand = require('./routes/brand');
const category = require('./routes/category');
const product = require('./routes/products');

app.use(cors());

app.use(morgan('dev'));


app.use(bodyParser.json());

app.use('/store',store);
app.use('/user',user);
app.use('/attributes',attributes);
app.use('/brand',brand);
app.use('/category',category);
app.use('/product',product);


app.get('/u', (req,res)=>{
    res.status(200).send('Server!')
})




mongoose.connect(URL,{ useUnifiedTopology: true, useNewUrlParser: true},err=>{
    if(err){
        return console.error("Error! :" + err)
    }else{
        console.log("Connected to Database")
    }
})



app.listen(PORT,()=>{
    console.log('Connected to Server! http://localhost:3000');
})