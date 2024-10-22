const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/userModel');
const router = express.Router();
const nodemailer = require('nodemailer')
const crypto = require('crypto');


// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new UserModel({ username, email, password: hashedPassword });

        // Save the user
        await newUser.save();

        // Respond with status true
        res.status(201).json({ status: true, message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

// Login route (as an example)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' });

        // Set the token in an HTTP-only cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });  // Cookie expires in 1 hour

        return res.json({ status: true, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});






router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    // Generate a secure token
    const token = crypto.randomBytes(32).toString('hex');
    const resetToken = crypto.createHash('sha256').update(token).digest('hex');
    
    // Set token expiry time, e.g., 1 hour from now
    const tokenExpiry = Date.now() + 3600000; 

    // Save the reset token and expiry to the user's document in the database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = tokenExpiry;
    await user.save();

    // Setup email transporter with environment variables
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Use environment variables
        pass: process.env.EMAIL_PASS  // Use environment variables
      }
    });

    // Setup mail options
    var mailOptions = {
      from: process.env.EMAIL_USER, // Should match the authenticated email
      to: email,
      subject: 'Reset password',
      text: `You requested a password reset. Please use the following link to reset your password: 
      http://localhost:5137/resetPassword/${token}
      The link will expire in 1 hour.`
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Email Error:', error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'Password reset email sent' });
      }
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});

const verifyUser = async (req,res,next)=>{
  try{
    const token = req.query.token;
    if(!token){
      return res.json ({status :false, message:"no token"})

    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
     next();

  } catch(err){
    return res.json(err)
  }
}


router.get('/verify',verifyUser, (req,res)=>{

  return res.json({ status :'true', message:"authorized"})

}) ;





module.exports = router;
