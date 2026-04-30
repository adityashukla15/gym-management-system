const express=require('express')
const authRouter=require('../src/routes/auth.routes')
const cookieParser=require('cookie-parser')
const memberRouter=require('../src/routes/member.routes')

const app=express()

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRouter)
app.use('/api/member',memberRouter)


module.exports=app