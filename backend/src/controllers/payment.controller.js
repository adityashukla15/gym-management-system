const paymentModel = require('../models/payment.model')
const planModel = require('../models/plan.model')
const memberModel = require('../models/member.model')

async function createPayment(req, res) {
    try {
        const userId = req.user._id
        const { planId, paymentMethod } = req.body
        const plan = await planModel.findById(planId)
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" })
        }
        const payment = await paymentModel.create({
            userId,
            planId,
            amount: plan.price,
            paymentMethod,
            status: 'pending'
        })
        return res.json({
            success: true,
            message: "Payment initiated",
            payment
        })

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function updatePaymentStatus(req, res) {
  try {
    const { paymentId, status } = req.body;

    const payment = await paymentModel.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const user = req.user; // ✅ IMPORTANT

    // 🔥 prevent double processing
    if (payment.status === 'success') {
      const existingMember = await memberModel.findOne({ userId: payment.userId });

      if (existingMember) {
        return res.status(400).json({
          message: "Payment already processed & member exists"
        });
      }
    }

    payment.status = status;
    await payment.save();

    if (status === "success") {

      const plan = await planModel.findById(payment.planId);

      if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
      }

      let endDate = new Date();
      endDate.setDate(endDate.getDate() + plan.duration);

      let member = await memberModel.findOne({ userId: payment.userId });

      if (member) {
        member.planId = payment.planId;
        member.membershipEndDate = endDate;
        member.isActive = true;
        await member.save();
      } else {
        await memberModel.create({
          userId: payment.userId,
          name: user.name,
          email: user.email,
          phone: user.phone,
          planId: payment.planId,
          membershipEndDate: endDate,
          isActive: true
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: `Payment ${status}`
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createPayment, updatePaymentStatus }