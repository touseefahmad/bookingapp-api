var express = require('express');
var bodyParser = require('body-parser');
var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Hospital } = require('./models/hospital');

var port = process.env.PORT || 3000;

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

//create hospitals
app.post('/create_hospital',(req,res)=>{
  var hospital =new Hospital({
    hospital_name : req.body.hospital_name,
    slots : req.body.slots
  });
  // hospital.save().then((doc)=>{
    for(var index = 0; index < req.body.slots;index++){
      var Parking = {
        parking_id: index,
        registerd_to:null,
        registered_date:null,
        start_date:null,
        expiration_date:null,
        booked_status:false,
        confirmed_status:false
      }
      hospital.parkings.push(Parking);

 }
 hospital.save().then((docs)=>{
   console.log(JSON.stringify(docs,undefined,2));
   res.send({
       code: '200',
       docs
     }
   );
 },(e)=>{
   console.log("Error while Pushing",e);
     res.send({
       code : '400',
       hospital : {
         hospital_name : 'null',
         slots : 0
       }
 });
});
});

//get booking slots
app.post('/get_slots',(req,res)=>{

  var name = req.body.hospital_name;
  console.log("query :",name);
  Hospital.find({hospital_name:name}).then((docs)=>{
    res.send({
      code: '200',
      docs
    });
  },(e)=>{
    console.log('error',e);
  });
},(e)=>{
  //TODO send a model
  res.status(400).send(e);
});




app.listen(port,()=>{
  console.log('Listening to port:',port);
});
