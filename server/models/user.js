var mongoose = require('mongoose');

//modle of user
var User = mongoose.model('User',{
  email:{
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },
  reg_no:{
    type: String,
    required: true,
    minlength:6,
    trim:true
  },
  password:{
    type: String,
    required: true,
    minlength:3,
    trim:true
  }
});

module.exports = { User };
