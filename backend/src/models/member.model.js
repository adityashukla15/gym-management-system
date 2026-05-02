const mongoose=require('mongoose')

const memberSchema=new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
    
    planId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Plan",
      required:true
    },
    membershipStartDate:{
        type:Date,
        default:Date.now()
    },
    membershipEndDate:{
        type:Date,
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

const memberModel=mongoose.model('member',memberSchema)
module.exports=memberModel

