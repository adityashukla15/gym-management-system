const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({

    trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    attendanceDate: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['present', 'absent'],
        default: 'present'
    }

}, { timestamps: true })

attendanceSchema.index(
  { trainerId: 1, attendanceDate: 1 },
  { unique: true }
);

const attendanceModel = mongoose.model(
  'attendance',
  attendanceSchema
)

module.exports = attendanceModel