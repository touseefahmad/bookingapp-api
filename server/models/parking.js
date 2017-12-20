var mongoose = require('mongoose');

//modle of hospitals
var Parking = mongoose.model('Parking',{
  hospital_name:{
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  slots:{
    type: Number,
    default: null,
    required: true
  },
  parking:[{
    parking_id:{
      type: String,
      required: true,
      trim: true
    },
    registered_to:{
      type: String,
      default:null,
      required:false
    },
    registerd_date:{
       type : Date,
       default: null
    },
    start_date:{
       type : Date,
       default: null
    },
    expiration_date:{
      type : Date,
      default: null
    },
    confirmed:{
      type: Boolean,
      default: false
    }
  }]
});

module.exports = { Hospital };
