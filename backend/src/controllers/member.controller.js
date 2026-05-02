const memberModel=require('../models/member.model')
const planModel=require('../models/plan.model')

async function createMember(req, res) {
  try {
    const data = req.body;
    const userId = req.user._id;

    // check duplicate
    const existingMember = await memberModel.findOne({ userId });

    if (existingMember) {
      return res.status(400).json({
        message: "Member profile already exists"
      });
    }

    let endDate = new Date(data.membershipStartDate || Date.now());

    if (data.membershipType === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } 
    else if (data.membershipType === 'quarterly') {
      endDate.setMonth(endDate.getMonth() + 3);
    } 
    else if (data.membershipType === 'yearly') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } 
    else {
      return res.status(400).json({
        message: "Invalid membership type"
      });
    }

    const member = await memberModel.create({
      ...data,
      userId,
      membershipEndDate: endDate
    });

    res.status(201).json({
      success: true,
      message: "Member created successfully",
      member
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

async function getAllMembers(req,res){
    try{
        const members=await memberModel.find().sort({createdAt: -1})
        res.status(200).json({
       success: true,
      count: members.length,
      members
        })
    }
    catch(err){
        res.status(500).json({
      success: false,
      message: err.message
    });
    }
}

async function getMemberById(req,res){
    try{
        const member=await memberModel.findById(req.params.id);
        if(!member){
            return res.status(404).json({
        success: false,
        message: "Member not found"
      });
        }
        res.status(200).json({
      success: true,
      member
    });
    }
    catch(err){
        res.status(500).json({
      success: false,
      message: err.message
    });
    }
    }
async function updateMember(req,res){
    try{
        const updatedMember=await memberModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!updatedMember){
        return res.status(404).json({
            success:false,
            message:"Member not found"
        })
    }
    res.status(200).json({
         success: true,
      message: "Member updated successfully",
      updatedMember
    })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
    
}
async function deleteMember(req,res){
    try{
        const member=await memberModel.findByIdAndDelete(req.params.id)
        if(!member){
            return res.status(404).json({
        success: false,
        message: "Member not found"
      });
        }
        res.status(200).json({
      success: true,
      message: "Member deleted successfully"
    });
    }
    catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

async function buyPlan(req,res){
  try{
    const userId=req.user._id
    const {planId}=req.body

    const plan=await planModel.findById(planId)
    if(!plan){
      return res.status(404).json({message:"Plan not found"})
    }

    let endDate=new Date()
    endDate.setDate(endDate.getDate()+plan.duration)

    let member=await memberModel.findOne({userId})
    if(member){
      member.planId=planId
      member.membershipEndDate=endDate
      member.isActive=true

      await member.save()
    }else{
      member=await memberModel.create({
         userId,
        planId,
        membershipEndDate: endDate,
        isActive: true
      })
    }
    return res.status(200).json({
      success: true,
      message: "Plan purchased successfully",
      member
    })

  }
  catch(err){
    res.status(500).json({
      message: err.message
    });
  }
}

async function getMyMembership(req,res){
  
  try{
    const member=await memberModel.findOne({userId:req.user._id}).populate('planId')
    return res.json(member)
  }catch(err){
    res.status(500).json({ message: err.message });
  }
}
module.exports={createMember,getAllMembers,getMemberById,updateMember,deleteMember,buyPlan,getMyMembership}
