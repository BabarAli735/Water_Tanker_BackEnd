const Users= require("../model/userModel");
const CatchAsync = require("../utills/catcAsync");
const jwt=require('jsonwebtoken')
const AppError = require("./../utills/appError");
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};
exports.signUp = CatchAsync(async (req, res) => {
  const newUser = await Users.create(req.body)

  const token=signToken(newUser._id)
  res.status(201).json({
    status: "Success",
    token:token,
    data: {
      user: newUser,
    },
  });
});

exports.signIn = CatchAsync(async (req, res,next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await Users.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
//3 if everything is ok send token to clients
const token=signToken(user._id);
res.status(200).json({
  statuc:'success',
  user,
  token
})
})
exports.sendOpt = CatchAsync(async (req, res,next) => {
 // Create a transport object using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'babar.mobile.developer124@gmail.com',
    pass: 'kgfiobvgrnkjlnuv'
  }
});
// Generate a random OTP
// const otp = otpGenerator.generate(6, { digits: false, alphabets: false, upperCase: false, specialChars: false });
const otp= Math.floor(Math.random() * 9000) + 1000;

// Set up email data
const mailOptions = {
  from: 'babar.mobile.developer124@gmail.com',
  to: req.body.email,
  subject: 'Your OTP for authentication',
  text: `Your OTP is ${otp}`
};
// Send the email with the OTP
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    res.status(200).json({
      statuc:'Error',
      message:error
    })
  } else {
    console.log('Email sent: ' + info.response);
    res.status(200).json({
      statuc:'Success',
      message:'Otp sent to your Email'
    })
  }
});
})

exports.protect = CatchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  
    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETE);
  
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }
  
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new AppError('User recently changed password! Please log in again.', 401));
    }
  
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  });