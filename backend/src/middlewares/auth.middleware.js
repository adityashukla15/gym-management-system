const userModel=require("../models/user.model")
const jwt =require('jsonwebtoken')
const userModel = require('../models/user.model');
const tokenBlackListModel = require('../models/blackList.model');

async function authMiddleware(req, res, next) {
  try {
    // token extract
    const token =
      req.cookies?.token ||
      (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access, token is missing"
      });
    }

    // blacklist check
    const isBlacklisted = await tokenBlackListModel.findOne({ token });

    if (isBlacklisted) {
      return res.status(401).json({
        message: "Unauthorized access, token is blacklisted"
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user
    const user = await userModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User no longer exists"
      });
    }

    // attach user to request
    req.user = user;

    next();

  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized access, invalid token"
    });
  }
}

module.exports={authMiddleware}