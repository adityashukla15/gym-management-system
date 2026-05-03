const express=require('express')
const authMiddleware=require('../middlewares/auth.middleware')
const paymentController=require('../controllers/payment.controller')


const router=express.Router()

router.post('/create',authMiddleware.authMiddleware,paymentController.createPayment)
router.post('/update-payments',authMiddleware.authMiddleware,paymentController.updatePaymentStatus)

module.exports=router