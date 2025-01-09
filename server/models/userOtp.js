const mongoose = require("mongoose");

const userOtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // The OTP document will automatically be removed after 300 seconds (5 minutes).
    }
});

const userotp = mongoose.model("userotp", userOtpSchema);
module.exports = userotp;
