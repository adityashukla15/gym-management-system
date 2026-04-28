const userModel=require('../models/user.model')
const tokenBlackListModel=require('../models/blackList.model')
const jwt=require('jsonwebtoken')

//Register Api
async function userRegisterController(req,res){
    const {email,password,name,phone}=req.body

    const isExists = await userModel.findOne({
  $or: [
    { email: email },
    { phone: phone }
  ]
});
if (isExists) {
  if (isExists.email === email) {
    return res.status(400).json({
      message: "Email already registered"
    });
  }

  if (isExists.phone === phone) {
    return res.status(400).json({
      message: "Phone number already registered"
    });
  }
}
const user= await userModel.create({
    email,password,name,phone
})
const token=jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn: "3d"})
res.cookie("token",token)
res.status(201).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            phone:user.phone
        },
        token
    })
}

//Login Api

async function userLoginController(req,res){
    const {email,password}=req.body
    const user = await userModel
  .findOne({ email })
  .select("+password");
    if(!user){
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }
    const isValidPassword=await user.comparePassword(password)
    if(!isValidPassword){
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }
     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })
     res.cookie("token",token)
     res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })
}

//Logout Api
async function userLogoutController(req,res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]
    if(!token){
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }
    await tokenBlackListModel.create({
        token:token
    })
    res.clearCookie("token")
    res.status(200).json({
        message: "User logged out successfully"
    })
}
module.exports={userRegisterController,userLoginController,userLogoutController}