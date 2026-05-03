const express=require('express')
const authRouter=require('../src/routes/auth.routes')
const cookieParser=require('cookie-parser')
const memberRouter=require('../src/routes/member.routes')
const planRouter=require('../src/routes/plan.routes')
const paymentRouter=require('../src/routes/payment.routes')

const app=express()

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRouter)
app.use('/api/member',memberRouter)
app.use('/api/plans',planRouter)
app.use('/api/payments',paymentRouter)

module.exports=app