const mongoose=require('mongoose')

const planSchema=new mongoose.Schema({
    planName:{
        type:String,
        required:[true,"Plan name is required"],
        enum:["monthly","quaterly","yearly","OneDay"],
        unique:[true,"Plan already exists"]
    },
    price:{
        type:Number,
        required:[true,"Price is required"]
    },
    duration:{
        type:Number,
        required:true
    },
    features:{
        type:[String],
        default:[]
    },
},{timestamps:true})

const planModel=mongoose.model('Plan',planSchema)
module.exports=planModel