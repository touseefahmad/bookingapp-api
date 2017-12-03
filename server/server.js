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

User.find({reg_no: req.body.reg_no}).then((user)=>{
  console.log('User Length:',user.length);
  if(user.length>0){
    console.log('user already existed');
    res.send({
      code:'400',
      user:{
        email:'null',
        reg_no:'Already registerd',
        password:'null'
      }
    });
  }else{
    console.log('Saving user');
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
      console.log('Error while saving:',e);
      res.send({
        code:'400',
        user:{
          email:'null',
          reg_no:'null',
          password:'null'
        }
      });
    });
  }

},(e)=>{
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


//login User
app.post('/login',(req,res)=>{
  User.findOne({reg_no:req.body.reg_no}).then((user)=>{
    console.log('User Returned:',user);
    if(user){
      if(user.password === req.body.password){
        console.log(`userPassword: ${user.password}, passedPassword: ${req.body.password}`);
        res.send({
          code: '200',
          user
        });
      }else{
        console.log('password not matched');
        res.send({
          code:'400',
          user:{
            email:'null',
            reg_no:'null',
            password:'null'
          }
      });
      }

    }else{
      console.log('user not found');
      res.send({
        code:'400',
        user:{
          email:'null',
          reg_no:'null',
          password:'null'
        }
    });
    }

  },(e)=>{
    console.log('reg no error',e);
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
});
