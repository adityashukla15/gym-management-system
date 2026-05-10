const express=require('express')
const attendanceController=require('../controllers/attendance.controller')
const roleMiddleware=require('../middlewares/role.middleware')
const authMiddleware=require('../middlewares/auth.middleware')

 
const router=express.Router()

router.post('/mark',authMiddleware.authMiddleware,roleMiddleware.isTrainer,attendanceController.markAttendance)

module.exports=router

