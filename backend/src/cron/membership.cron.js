const cron=require('node-cron')

const memberModel=require('../models/member.model')

const expireMemberships = () => {

  // 🔥 every day at 12 AM
  cron.schedule('0 0 * * *', async () => {

    try {

      console.log("⏰ Running membership expiry cron job...");

      const result = await memberModel.updateMany(
        {
          membershipEndDate: { $lt: new Date() },
          isActive: true
        },
        {
          $set: { isActive: false }
        }
      );

      console.log(`✅ ${result.modifiedCount} memberships expired`);

    } catch (err) {
      console.log("❌ Cron Job Error:", err.message);
    }

  });

};

module.exports = expireMemberships;