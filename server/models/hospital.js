var mongoose = require('mongoose');
var { User } = require('./user');


//modle of hospitals
var Hospital = mongoose.model('Hospital',{
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
  parkings:[{
    parking_id:{
      type: Number,
      required: true
    },
    registerd_to:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default:null
    },
    registered_date:{
      type: Date,
      default:null
    },
    start_date:{
      type: Date,
      default:null
    },
    expiration_date:{
      type: Date,
      default:null
    },
    booked_status:{
      type: Boolean,
      default:false
    },
    confirmed_status:{
      type:Boolean,
      default:false
    }
  }]
});

module.exports = { Hospital };
