const mongoose=require('mongoose')

const planSchema=new mongoose.Schema({
    planName:{
        type:String,
        required:[true,"Plan name is required"],
        enum:["monthly","quaterly","yearly"],
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

const planModel=mongoose.model('plan',planSchema)
module.exports=planModel