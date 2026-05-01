const planModel=require('../models/plan.model')

//admin acess only
async function createPlan(req,res){
    try{
        const {planName, price, duration, features}=req.body
    const plan=await planModel.create({
        planName,
      price,
      duration,
      features
      })
      return res.status(200).json({
      success: true,
      message: "Plan created successfully",
      plan
      })
    }
    catch(err){
        res.status(500).json({
      success: false,
      message: err.message
    });
    }
}

async function getAllPlans(req,res){
    try{
        const plans=await planModel.find().sort({ price: 1 })
        return res.status(200).json({
            success: true,
            count: plans.length,
           plans
        })
    }
    catch(err){
        res.status(500).json({
      success: false,
      message: err.message
    });
    }
}

async function getPlanById(req,res){
    try{
        const plan= await planModel.findById(req.params.id)
        if(!plan){
            return res.status(404).json({
                message: "Plan not found"
            })
        }
        return res.status(200).json({
            sucess:true,
            plan
        })
    }
    catch(err){
         res.status(500).json({
      message: err.message
    });
    }
}
async function updatePlan(req,res){
    try{
        const updatedPlan= await planModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        if (!updatedPlan) {
      return res.status(404).json({
        message: "Plan not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Plan updated",
      updatedPlan
    });
    }
    catch(err){
        res.status(500).json({
      message: err.message
    });
    }
}

async function deletePlan(req,res){
    try{
        const plan=await planModel.findByIdAndDelete(
            req.params.id
        )
        if(!plan){
            return res.status(404).json({
        message: "Plan not found"
      });
        }
        res.status(200).json({
      success: true,
      message: "Plan deleted"
    });
    }
    catch(err){
        res.status(500).json({
      message: err.message
    });
    }
}

module.exports={createPlan,getAllPlans,getPlanById,updatePlan,deletePlan}