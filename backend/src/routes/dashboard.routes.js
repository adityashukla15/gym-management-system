const express=require('express')
const router=express.Router()


const authMiddleware=require('../middlewares/auth.middleware')
const roleMiddleware=require('../middlewares/role.middleware')
const dashboardController=require('../controllers/dashboard.controller')

router.get('/admin',authMiddleware.authMiddleware,roleMiddleware.isAdmin,dashboardController.getAdminDashboard)
router.get('/user',authMiddleware.authMiddleware,dashboardController.getUserDashboard)
router.get('/trainer',authMiddleware.authMiddleware,roleMiddleware.isTrainer,dashboardController.getTrainerDashboard)
router.get('/attendance-admin',authMiddleware.authMiddleware,roleMiddleware.isAdmin,dashboardController.getAttendanceDashboard)
module.exports=router