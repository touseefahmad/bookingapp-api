var express = require('express');
var bodyParser = require('body-parser');
var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');

var port = process.env.PORT || 5000;

var app = express();

app.use(bodyParser.json());

//api functions
//register User

app.post('/signup',(req,res)=>{

  var user =new User({
    email : req.body.email,
    reg_no: req.body.reg_no,
    password: req.body.password
  });

  user.save().then((user)=>{
    res.send({
      code: '200',
      user
    });
  },(e)=>{
    console.log('Error:',e);
    res.send({
      code:'400',
      user:{
        email:'null',
        reg_no:'null',
        password:'null'
      }
    });
  });

});


app.listen(port,()=>{
  console.log('Listening to port:',port);
})
