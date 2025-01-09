const users = require("../models/userSchema");
const userotp = require("../models/userOtp");
const nodemailer = require("nodemailer");


// email config
const tarnsporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


exports.userregister = async (req, res) => {
    const { fname, email, password } = req.body;

    if (!fname || !email || !password) {
        res.status(400).json({ error: "Please Enter All Input Data" })
    }

    try {
        const presuer = await users.findOne({ email: email });

        if (presuer) {
            res.status(400).json({ error: "This User Already exist in our db" })
        } else {
            const userregister = new users({
                fname, email, password
            });

            // here password hasing

            const storeData = await userregister.save();
            res.status(200).json(storeData);
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};



// user send otp
exports.userOtpSend = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ error: "Please Enter Your Email" })
    }


    try {
        const presuer = await users.findOne({ email: email });

        if (presuer) {
            
            const OTP = Math.floor(100000 + Math.random() * 900000);

            const existEmail = await userotp.findOne({ email: email });

            if (existEmail) {
                const updateData = await userotp.findByIdAndUpdate({ _id: existEmail._id }, {
                    otp: OTP
                }, { new: true }
                );
                await updateData.save();
                
                const htmlContent = `
                <html>
                <body>
                    <h1>OTP Verification</h1>
                    <p>Your OTP is: <strong>${OTP}</strong></p>
                    <p>Thank you</p>
                </body>
                </html>`;
        
                
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending Email For Otp Validation",
                    html : htmlContent
                }


                tarnsporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })

            } else {

                const saveOtpData = new userotp({
                    email, otp: OTP
                });

                await saveOtpData.save();
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending Eamil For Otp Validation",
                    text: `OTP:- ${OTP}`
                }

                tarnsporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })
            }
        } else {
            res.status(400).json({ error: "This User Not Exist In our Db" })
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }
};

exports.userLogin = async (req, res) => {
    const { email, otp } = req.body;

    if (!otp || !email) {
        return res.status(400).json({ error: "Please Enter Your OTP and Email" });
    }

    try {
        const otpVerification = await userotp.findOne({ email: email });

        if (!otpVerification) {
            return res.status(400).json({ error: "OTP not found or expired" });
        }

        // Check OTP validity period (e.g., 5 minutes)
        const currentTime = Date.now();
        const otpCreationTime = new Date(otpVerification.createdAt).getTime();
        const timeDifference = (currentTime - otpCreationTime) / 1000; // in seconds

        if (timeDifference > 300) { // 300 seconds = 5 minutes
            return res.status(400).json({ error: "OTP has expired. Please request a new one." });
        }

        if (otpVerification.otp === otp) {
            const preUser = await users.findOne({ email: email });

            // Token generation
            const token = await preUser.generateAuthtoken();
            return res.status(200).json({ message: "User Login Successfully Done", userToken: token });
        } else {
            return res.status(400).json({ error: "Invalid OTP" });
        }
    } catch (error) {
        return res.status(400).json({ error: "Invalid Details", error });
    }
};
