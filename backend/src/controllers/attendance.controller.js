const attendanceModel=require('../models/attendance.model')

async function markAttendance(req, res) {

  try {

    const trainerId = req.user._id;

    // 🔥 today's date string
    const today = new Date().toISOString().split('T')[0];

    // 🔥 duplicate check
    const alreadyMarked = await attendanceModel.findOne({
      trainerId,
      attendanceDate: today
    });

    if (alreadyMarked) {
      return res.status(400).json({
        message: "Attendance already marked today"
      });
    }

    // 🔥 create
    const attendance = await attendanceModel.create({
      trainerId,
      attendanceDate: today,
      status: 'present'
    });

    return res.status(201).json({
      success: true,
      attendance
    });

  } catch (err) {

    // 🔥 duplicate index error
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Attendance already marked today"
      });
    }

    res.status(500).json({
      message: err.message
    });
  }
}

module.exports = { markAttendance };