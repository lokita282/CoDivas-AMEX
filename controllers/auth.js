//  OLD PROJECTS SE LIYA HAIN! NOT UPDATED
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const {removeSensitiveData} = require("../utils/functions");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { sendEmail, generateotp } = require("../utils/email");
const axios = require("axios");

const testTwilio = (req, res) => {
  try {
    client.messages
      .create({body: 'Hi there', from: '+15134576207', to: '+919920325295'})
      .then(message => console.log(message.sid));
  } catch (error) {
    console.log(error);
  }
}

// Signup
const signup = async (req, res) => {
  try {

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({
        message: "User Already Exists!",
        data: {
          user: user,
        },
      });
      return;
    }

    let newUser = new User({
      ...req.body,
    });
    
    await newUser.save();
    const token = await User.generatejwt(newUser._id);
 
    newUser = removeSensitiveData(newUser);
    // Sending a response back
    res.status(201).json({
      message: "User Signed Up",
      data: {
        token,
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(400).json({
        message: "User does not exist",
      });
      return;
    }
    const token = await User.generatejwt(user._id);
    await sendEmail({
      subject: `Password Reset Request on Caramel Cheese Popcorn`,
      emailId: user.email,
      filename: "reset",
      fileOptions: {
        name: user.fname,
        // link: `https://ana3d.in/reset-password/${token}`,
      },
    });
    res.status(200).json({
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const {token} = req.params;
    // console.log(token);
    const { password } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user
      = await User.findOne({
        _id: decoded._id,
      });
    if (!user) {
      res.status(400).json({
        message: "User does not exist",
      });
      return;
    }
    user.password = password;
    await user.save();
    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


// Login
const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
   
    if (!user) {
      res.status(404).json({
        message: "User not found!",
      });
      return;
    }

    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    
    if (!isMatch) {
      res.status(401).json({
        message: "Invalid credentials!",
        
      });
      return;
    }

    const token = await User.generatejwt(user._id);

    user = removeSensitiveData(user);

    res.status(200).json({
      message: "User Verified!",
      token,
      user
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      
    });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    const currentUser = req.user;
    const token = req.token;

    currentUser.tokens = currentUser.tokens.filter((usertoken) => {
      return usertoken.token !== token;
    });

    await currentUser.save();

    res.status(200).json({
      message: "Successfully logged out!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Logout of all
const logoutAll = async (req, res) => {
  try {
    const currentUser = req.user;
    currentUser.tokens = [];
    await currentUser.save();

    res.status(200).json({
      message: "Successfully logged out of all sessions!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({
        message: "User not found!",
      });
      return;
    }

    const isMatch = await bcryptjs.compare(req.body.oldpassword, user.password);
    if (!isMatch) {
      res.status(401).json({
        message: "Invalid credentials!",
      });
      return;
    }

    user.password = await req.body.newpassword;
    if (!user.passwordChanged) {
      user.passwordChanged = true;
    }

    await user.save();

    res.status(200).json({
      message: "Password changed!"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const verifyTenant = async (req, res) => {
  try {
      const user = req.user;
      if (req.body.pan) {
        const data = {"task_id":"74f4c926-250c-43ca-9c53-453e87ceacd1","group_id":"8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e","data":{"id_number":req.body.pan}}
        const options = {
            method: 'POST',
            url: 'https://pan-card-verification1.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_pan',
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': '7f564e746fmsh559e1d6f6962809p12b551jsnf7d052c3addb',
              'X-RapidAPI-Host': 'pan-card-verification1.p.rapidapi.com'
            },
            data: JSON.stringify(data)
          };
          
          const response = await axios.request(options)
          
          const result = response.data.result.source_output
          console.log(result);
         
          if(result.status === "id_found") {
            const fullName = result.first_name + " "  + result.last_name
            if (fullName.toLowerCase().replace(/ /g,'') === user.name.toLowerCase().replace(/ /g,'')) {
              console.log(fullName.toLowerCase().replace(/ /g,''), user.name.toLowerCase().replace(/ /g,''))
              user.verified = {
                pan: true,
                ...user.verified
              }
            } else {
              return res.status(400).json({
                message: "Name on PAN card does not match with the name on your account",
              });
            }
          } else {
            return res.status(400).json({
              message: "PAN card not found",
            });
          }
    }
      const emailotp = generateotp(6);
    
      const emailRes = await sendEmail({
          subject: `Verify your email on Roomble`,
          emailId: user.email,
          filename: "otpemail",
          fileOptions: {
              name: user.name,
              otp: emailotp,
          },
      });
      const phoneotp = generateotp(6);
      user.otp = {
          email: emailotp,
          phone: phoneotp,
      }
      client.messages
      .create({body: `Hi ${user.name}, verify your Roomble account by using ${phoneotp} as your passcode`, from: '+15134576207', to: '+919920325295'})
      .then(message => console.log(message.sid));
      await user.save();
      

      res.status(200).json({
          message: "OTP sent to your email and phone number, PAN verified",
          
      });
      


  }
  catch(err) {
    res.status(400).json({
      message: err.message,
    });
  }
}

const verifyOtp = async (req, res) => {
  try {
      const user = req.user;
      if (user.otp.email === req.body.emailotp && user.otp.phone === req.body.phoneotp) {
          user.verified.email = true;
          user.verified.phone = true;
          user.verified.pan = true;
          await user.save();
          res.status(200).json({
              message: "User verified",
              user: removeSensitiveData(user),
          });
      } else {
          res.status(400).json({
              message: "Invalid OTP",
          }); 
      }
  }
  catch(err) {
    res.status(400).json({
      message: err.message,
    });
  }
}



// Exporting modules
module.exports = {
  signup,
  login,
  logout,
  logoutAll,
  changePassword,
  signupAdmin,
  forgotPassword,
  resetPassword,
  testTwilio,
  verifyTenant,
  verifyOtp,
};
