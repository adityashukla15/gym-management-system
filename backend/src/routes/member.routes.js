const express=require('express')

const router=express.Router()

const authMiddleware=require('../middlewares/auth.middleware')
const memberController=require('../controllers/member.controller')

router.post('/create',authMiddleware.authMiddleware,memberController.createMember)
router.get('/all',authMiddleware.authMiddleware,memberController.getAllMembers)
router.get('/my-membership',authMiddleware.authMiddleware,memberController.getMyMembership)
router.get('/:id',authMiddleware.authMiddleware,memberController.getMemberById)
router.put('/update/:id',authMiddleware.authMiddleware,memberController.updateMember)
router.delete('/delete/:id',authMiddleware.authMiddleware,memberController.deleteMember)



module.exports=router