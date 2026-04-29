const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required for creating a user'],
    },
    email:{
        type:String,
        required:[true,"Email is required for creating a user"],
        trim:true,
        unique:[true,"Email already exists"],
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Incorrect email address"],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password must be atleast 6 characters"],
        select:false
    },
    role:{
        type:String,
        enum:["Admin","Member","Trainer"],
        default:"Member"
    },
    phone:{
        type:String,
        required:[true,"Phone number is required for creating a user"],
        match:[/^[6-9]\d{9}$/,"Please enter a valid Indian phone number"],
        unique:[true,"Phone number already exists"]
    },
    status: {
     type: String,
     enum: ['active', 'inactive', 'blocked'],
     default: 'active'
},
},{timestamps:true})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return
    }
    const hash=await bcrypt.hash(this.password,10)
    this.password=hash
    return
})
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)

}
const userModel=mongoose.model('user',userSchema)
module.exports=userModel