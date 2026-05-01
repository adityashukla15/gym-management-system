const express=require('express')
const authMiddleware=require('../middlewares/auth.middleware')
const roleMiddleware=require('../middlewares/role.middleware')
const planController=require('../controllers/plan.controller')

const router=express.Router()

router.post('/create',authMiddleware.authMiddleware,roleMiddleware.isAdmin,planController.createPlan)
router.get('/all',authMiddleware.authMiddleware,roleMiddleware.isAdmin,planController.getAllPlans)
router.get('/:id',authMiddleware.authMiddleware,roleMiddleware.isAdmin,planController.getPlanById)
router.patch('/update/:id',authMiddleware.authMiddleware,roleMiddleware.isAdmin,planController.updatePlan)
router.delete('/delete/:id',authMiddleware.authMiddleware,roleMiddleware.isAdmin,planController.deletePlan)

module.exports=router