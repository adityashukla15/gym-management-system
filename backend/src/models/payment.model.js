const mongoose=require('mongoose')

const paymentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    planId:{
        type:mongoose.Types.ObjectId,
        ref:"Plan"
    },
    amount:{
        type:Number,
        required:[true,"Amount is required for payment"],
    },
    status:{
        type:String,
        enum:["pending","success","failed"],
        default:"pending"
    },
    paymentMethod: {
    type: String,
    enum: ['cash', 'upi', 'card'],
    default: 'cash',
    required:true,
  }
},{timestamps:true})

const paymentModel=mongoose.model('Payment',paymentSchema)
module.exports=paymentModel