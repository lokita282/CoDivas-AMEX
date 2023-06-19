const User = require('../models/user');
const Merchant = require('../models/merchant');
const Bank = require('./../models/bank');
const Beneficiary = require('./../models/beneficiary');
const Voucher = require('./../models/voucher');
const bcryptjs = require('bcryptjs');
const {
    removeSensitiveData,
    encryptData,
    decryptData
} = require('../utils/functions');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const axios = require('axios');
const { recordActivity } = require('../services/activity-log');

const fourDigitNumber = (customString) =>
    Array.from(customString).reduce(
        (a, b) => a + parseInt(b.charCodeAt(0)).toString(16),
        ''
    ) % 10000;
const toTitleCase = (str) =>
    str.replace(
        /(^\w|\s\w)(\S*)/g,
        (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
    );
const testTwilio = (req, res) => {
    try {
        client.messages
            .create({
                body: 'Hi there',
                from: '+18648358967',
                to: '+919920325295'
            })
            .then((message) => console.log(message.sid));
    } catch (error) {
        console.log(error);
    }
};

const shortCodes = {
    health: 'HEA',
    agriculture: 'AGR',
    education: 'EDU',
    food: 'FOD',
    housing: 'HOU',
    transportation: 'TRA',
    utility: 'UTI',
    telecommunication: 'TEL',
    other: 'OTH'
};

const signupBeneficiary = async (req, res) => {
    try {
        const bodyData = JSON.parse(decryptData(req.body.data));

        let user = await User.findOne({ phone: bodyData.phone });
        if (user) {
            res.status(400).json({
                message: 'User Already Exists!',
                data: {
                    user: user
                }
            });
            return;
        }

        // Commenting it because API requests are limited (35 per month)

        // if (bodyData.pan) {
        //     const options = {
        //         method: 'POST',
        //         url: 'https://pan-card-verification1.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_pan',
        //         headers: {
        //             'content-type': 'application/json',
        //             'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        //             'X-RapidAPI-Host': 'pan-card-verification1.p.rapidapi.com'
        //         },
        //         data: {
        //             task_id: '74f4c926-250c-43ca-9c53-453e87ceacd1',
        //             group_id: '8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e',
        //             data: {
        //                 id_number: bodyData.pan
        //             }
        //         }
        //     };

        //     try {
        //         const response = await axios.request(options);
        //         console.log(response.data);
        //         if (
        //             response.data.result.source_output.status === 'id_not_found'
        //         ) {
        //             res.status(400).json({
        //                 message: 'Invalid PAN Number'
        //             });
        //             return;
        //         }
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }

        let newUser = new User({
            ...bodyData,
            type: bodyData.type ? bodyData.type : 'beneficiary'
        });
        await newUser.save();
        let beneficiary = await Beneficiary.findOne({ phone: newUser.phone });

        if (beneficiary) {
            beneficiary.user = newUser._id;
            await beneficiary.save();
            newUser.beneficiary = beneficiary._id;
            await newUser.save();
        } else {
            beneficiary = new Beneficiary({
                user: newUser._id,
                phone: newUser.phone,
                vouchersReceived: []
            });
            await beneficiary.save();
            newUser.beneficiary = beneficiary._id;
            await newUser.save();
        }
        const token = await User.generatejwt(newUser._id);

        // FOR SIGNING UP OF BANK (BACKEND USE ONLY)
        // let newBank = new Bank({
        //     user: newUser._id,
        //     bankLogo: bodyData.bankLogo,
        //     vouchersIssued: new Array()
        // });
        // await newBank.save();

        // newUser.bank = newBank._id;
        // await newUser.save();

        newUser = removeSensitiveData(newUser);

        // Activity Log
        let userIPAddress = req.headers['cf-connecting-ip'];
        if (userIPAddress instanceof Array) {
            userIPAddress = userIPAddress.join(',');
        }
        let userReq = {
            user: {
                _id: newUser._id,
                type: newUser.type
            },
            userAgent: req.headers['user-agent'],
            userIPAddress: userIPAddress
        };

        const activityLog = await recordActivity(userReq, newUser, 'Sign Up');
        const encryptedData = encryptData(
            JSON.stringify({
                message: 'User Signed Up',
                data: {
                    token,
                    user: newUser
                }
            })
        );
        // res.status(201).json({
        //     message: 'User Signed Up',
        //     data: {
        //         token,
        //         user: newUser
        //     }
        // });
        res.status(201).send(encryptedData);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const signupMerchant = async (req, res) => {
    try {
        const bodyData = JSON.parse(decryptData(req.body.data));
        let user = await User.findOne({ phone: bodyData.phone });
        if (user) {
            res.status(400).json({
                message: 'User Already Exists!',
                data: {
                    user: user
                }
            });
            return;
        }

        let newUser = new User({
            ...bodyData,
            type: 'merchant'
        });

        await newUser.save();
        const token = await User.generatejwt(newUser._id);

        let businessName = `${bodyData.name}'s Business`;
        let gstDetails = null;
        if (bodyData.gstNo) {
            let gstDetailsRes = await axios.get(
                `https://gst-return-status.p.rapidapi.com/free/gstin/${bodyData.gstNo}`,
                {
                    headers: {
                        'x-rapidapi-key': process.env.RAPID_API_KEY,
                        'x-rapidapi-host': 'gst-return-status.p.rapidapi.com'
                    }
                }
            );
            if (gstDetailsRes.data && gstDetailsRes.data.data) {
                if (gstDetailsRes.data.data.tradeName) {
                    businessName = toTitleCase(
                        gstDetailsRes.data.data.tradeName
                    );
                    gstDetails = gstDetailsRes.data.data;
                }
            }
        }

        let newMerchant = new Merchant({
            ownerName: newUser._id,
            uid:
                shortCodes[bodyData.category] +
                '-' +
                fourDigitNumber(newUser._id.toString()),
            ...bodyData,
            businessName,
            user: newUser._id
        });
        await newMerchant.save();
        newUser.merchant = newMerchant._id;
        await newUser.save();

        newUser = removeSensitiveData(newUser);

        // Activity Log
        let userIPAddress = req.headers['cf-connecting-ip'];
        if (userIPAddress instanceof Array) {
            userIPAddress = userIPAddress.join(',');
        }
        let userReq = {
            user: {
                _id: newUser._id,
                type: newUser.type
            },
            userAgent: req.headers['user-agent'],
            userIPAddress: userIPAddress
        };

        const activityLog = await recordActivity(
            userReq,
            newMerchant,
            'Sign Up'
        );
        const encryptedData = encryptData(
            JSON.stringify({
                message: 'User Signed Up',
                data: {
                    token,
                    user: newUser,
                    merchant: newMerchant,
                    UID: newMerchant.uid
                }
            })
        );
        // Sending a response back
        // res.status(201).json({
        //     message: 'User Signed Up',
        //     data: {
        //         token,
        //         user: newUser,
        //         merchant: newMerchant,
        //         UID: newMerchant.uid
        //     }
        // });
        res.status(201).send(encryptedData);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const bodyData = JSON.parse(decryptData(req.body.data));
        let user = await User.findOne({
            email: bodyData.email
        });
        if (!user) {
            res.status(400).json({
                message: 'User does not exist'
            });
            return;
        }
        const token = await User.generatejwt(user._id);
        await sendEmail({
            subject: `Password Reset Request on Caramel Cheese Popcorn`,
            emailId: user.email,
            filename: 'reset',
            fileOptions: {
                name: user.fname
                // link: `https://ana3d.in/reset-password/${token}`,
            }
        });
        const encryptedData = encryptData(
            JSON.stringify({
                message: 'Password reset link sent to your email'
            })
        );
        res.status(200).send(encryptedData);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const bodyData = JSON.parse(decryptData(req.body.data));
        // console.log(token);
        const { password } = bodyData;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            _id: decoded._id
        });
        if (!user) {
            res.status(400).json({
                message: 'User does not exist'
            });
            return;
        }
        user.password = password;
        await user.save();
        const encryptedData = encryptData(
            JSON.stringify({
                message: 'Password reset successful'
            })
        );

        // res.status(200).json({
        //     message: 'Password reset successful'
        // });
        res.status(200).send(encryptedData);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Login
const login = async (req, res) => {
    try {
        const bodyData = JSON.parse(decryptData(req.body.data));
        let user = await User.findOne({ phone: bodyData.phone });

        if (!user) {
            res.status(404).json({
                message: 'User not found!'
            });
            return;
        }

        const isMatch = await bcryptjs.compare(
            bodyData.password,
            user.password
        );

        if (!isMatch) {
            res.status(401).json({
                message: 'Invalid credentials!'
            });
            return;
        }

        const token = await User.generatejwt(user._id);

        user = removeSensitiveData(user);
        const encryptedData = encryptData(
            JSON.stringify({
                message: 'User Verified!',
                token,
                user
            })
        );
        // res.status(200).json({
        //     message: 'User Verified!',
        //     token,
        //     user
        // });
        res.status(200).send(encryptedData);
    } catch (error) {
        res.status(400).json({
            message: error.message
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
        const encryptedData = encryptData(
            JSON.stringify({
                message: 'Successfully logged out!'
            })
        );
        // res.status(200).json({
        //     message: 'Successfully logged out!'
        // });
        res.status(200).send(encryptedData);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Logout of all
const logoutAll = async (req, res) => {
    try {
        const currentUser = req.user;
        currentUser.tokens = [];
        await currentUser.save();
        const encryptedData = encryptData(
            JSON.stringify({
                message: 'Successfully logged out of all sessions!'
            })
        );
        // res.status(200).json({
        //     message: 'Successfully logged out of all sessions!'
        // });
        res.status(200).send(encryptedData);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Change Password
const changePassword = async (req, res) => {
    try {
        let user = await User.findById(req.user._id);
        const bodyData = JSON.parse(decryptData(req.body.data));
        if (!user) {
            res.status(404).json({
                message: 'User not found!'
            });
            return;
        }

        const isMatch = await bcryptjs.compare(
            bodyData.oldpassword,
            user.password
        );
        if (!isMatch) {
            res.status(401).json({
                message: 'Invalid credentials!'
            });
            return;
        }

        user.password = await bodyData.newpassword;
        if (!user.passwordChanged) {
            user.passwordChanged = true;
        }

        await user.save();
        const encryptedData = encryptData(
            JSON.stringify({
                message: 'Password changed!'
            })
        );

        // res.status(200).json({
        //     message: 'Password changed!'
        // });
        res.status(200).send(encryptedData);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const testEncryption = async (req, res) => {
    try {
        // this will come at the end of our controllers

        const encryptedData = encryptData(req.body.data);

        res.status(200).json({
            message: 'Encrypted data taiyaar',
            data: {
                encryptedData
            }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const testDecryption = async (req, res) => {
    try {
        // this will come at the beginning of our controller
        let decryptedString = decryptData(req.body.encryptedData);
        let decryptedData = JSON.parse(decryptedString);

        res.status(200).json({
            message: 'Encrypted data ko decrypt karke woh bhi taiyaar',
            data: decryptedData
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Exporting modules
module.exports = {
    signupBeneficiary,
    signupMerchant,
    login,
    logout,
    logoutAll,
    changePassword,
    forgotPassword,
    resetPassword,
    testTwilio,
    testEncryption,
    testDecryption
};
