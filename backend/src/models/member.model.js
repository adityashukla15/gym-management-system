const mongoose=require('mongoose')

const memberSchema=new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
    name:{
        type:String,
        required:[true,"Name is required for membership"]
    },
    email:{
        type:String,
        required:[true,"Email is required for membership"],
        trim:true,
        unique:[true,"Email already exists"],
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Incorrect email address"],
    },
    phone:{
        type:String,
        required:[true,"Phone number is required for creating a user"],
        match:[/^[6-9]\d{9}$/,"Please enter a valid Indian phone number"],
        unique:[true,"Phone number already exists"]
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"],
        default:"Male",
        required:[true,"Gender is required"]
    },
    membershipType:{
        type:String,
        enum:["monthly","yearly","quaterly"],
        default:"monthly",
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

