function isAdmin(req,res,next){
    if(req.user.role!=='Admin'){
        return res.status(403).json({
      message: "Access denied: Admin only"
    });
    }
    next()
}

function isTrainer(req,res,next){
    if(req.user.role!=='Trainer'){
        return res.status(403).json({
      message: "Access denied: Trainer only"
    });
    }
    next()
}

module.exports={isAdmin,isTrainer}