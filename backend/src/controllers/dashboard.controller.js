const paymentModel=require('../models/payment.model')
const memberModel=require('../models/member.model')
const attendanceModel=require('../models/attendance.model')
const userModel=require('../models/user.model')

async function getAdminDashboard(req, res) {
  try {

    //  1. Total Revenue
    const revenueResult = await paymentModel.aggregate([
      { $match: { status: "success" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" }
        }
      }
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    //  2. Total Members
    const totalMembers = await memberModel.countDocuments();

    //  3. Active Members
    const activeMembers = await memberModel.countDocuments({ isActive: true });

    // 4. Plan-wise users
    const planWiseUsers = await memberModel.aggregate([
      {
        $group: {
          _id: "$planId",
          totalUsers: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "plans", // collection name in MongoDB
          localField: "_id",
          foreignField: "_id",
          as: "planDetails"
        }
      },
      {
        $unwind: "$planDetails"
      },
      {
        $project: {
          planName: "$planDetails.planName",
          totalUsers: 1
        }
      }
    ]);

    //  5. Monthly Revenue
    const monthlyRevenue = await paymentModel.aggregate([
      { $match: { status: "success" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    return res.status(200).json({
      success: true,
      dashboard: {
        totalRevenue,
        totalMembers,
        activeMembers,
        planWiseUsers,
        monthlyRevenue
      }
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

async function getUserDashboard(req, res) {
  try {

    const userId = req.user._id;

    // 🔥 await add kiya
    const member = await memberModel
      .findOne({ userId })
      .populate("planId", "planName price duration");

    // ❌ no membership
    if (!member) {
      return res.json({
        success: true,
        message: "No membership found",
        dashboard: null
      });
    }

    // 🔥 expiry check
    const isExpired = member.membershipEndDate < new Date();

    // 🔥 days left
    const daysLeft = Math.max(
      0,
      Math.ceil(
        (member.membershipEndDate - new Date()) / (1000 * 60 * 60 * 24)
      )
    );

    // 🔥 total payments (missing tha)
    const totalPayments = await paymentModel.countDocuments({
      userId,
      status: "success"
    });

    // 🔥 last payment
    const lastPayment = await paymentModel
      .findOne({ userId, status: "success" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      dashboard: {
        plan: member.planId,
        isActive: !isExpired,
        isExpired, // optional but useful 🔥
        daysLeft,
        membershipEndDate: member.membershipEndDate,
        totalPayments,
        lastPayment
      }
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

async function getTrainerDashboard(req,res){
  try{
    const trainerId=req.user._id
    const totalAttendance=await attendanceModel.countDocuments({
      trainerId
    })

    const today=new Date().toISOString().split('T')[0]
    
    const todayAttendance=await attendanceModel.findOne({
      trainerId,
      attendanceDate:today
    })
    const presentCount=await attendanceModel.countDocuments({
      trainerId,
      status:'present'
    })
    const lastAttendance=await attendanceModel.findOne({trainerId})
      .sort({createdAt: -1})

    return res.status(200).json({
      success: true,
      dashboard: {
        totalAttendance,
        todayMarked: !!todayAttendance,
        presentCount,
        lastAttendance
      }
    });
  }
  catch(err){
    res.status(500).json({
      message: err.message
    });
  }
}

async function getAttendanceDashboard(req,res){
  try{
    const totalTrainers=await userModel.countDocuments({
      role:'Trainer'
    })
    const today=new Date().toISOString().split('T')[0]
    
    const presentToday=await attendanceModel.countDocuments({
      attendanceDate:today,
      status:'present'
    })

    const absentToday=totalTrainers-presentToday

    const attendanceStats = await attendanceModel.aggregate([

      {
        $group: {
          _id: "$trainerId",
          totalPresent: { $sum: 1 }
        }
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "trainer"
        }
      },

      {
        $unwind: "$trainer"
      },

      {
        $project: {
          trainerName: "$trainer.name",
          totalPresent: 1
        }
      }

    ]);
    return res.status(200).json({
      success: true,
      dashboard: {
        totalTrainers,
        presentToday,
        absentToday,
        attendanceStats
      }
    });

  }
  catch(err){
    res.status(500).json({
      message: err.message
    });
  }
}
module.exports={getAdminDashboard,getUserDashboard,getTrainerDashboard,getAttendanceDashboard}