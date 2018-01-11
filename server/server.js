var express = require('express');
var bodyParser = require('body-parser');
var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Hospital }= require('./models/hospital');

var port = process.env.PORT || 5000;

var app = express();

var jsonDate = "1970-01-01T00:00:00.000Z";
var then = new Date(jsonDate);

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

// add hospitals parkings
app.post('/addHospital',(req,res)=>{
  console.log('inside adding hospital');
Hospital.findOne({hospital_name : req.body.hospital_name}).then((hospital)=>{
  console.log('hospital found:',hospital);
  if(!hospital){
    console.log('adding hospital');
    var hospital =new Hospital({
      hospital_name : req.body.hospital_name,
      slots: req.body.slots,
      parking:[
      ]
    });
    for(var i=0; i<req.body.slots; i++){
      console.log('inside loop');
    var parking = {
      parking_id :i.toString(),
      registered_to:then,
      registerd_date:then,
      start_date:then,
      expiration_date:then,
      booked_status:false,
      confirmed : false
    };
    hospital.parking.push(parking);
  }


    hospital.save().then((hospital)=>{
      res.send({
        code:200,
        hospital
      });
    },(e)=>{console.log('error adding hospital',e);})













    //////////////////////////

  }else{
    console.log('user already existed');
    res.send({
      code : 400,
      hospital
    });
  }
},(e)=>{
  console.log('something went wrong trying adding user');
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
