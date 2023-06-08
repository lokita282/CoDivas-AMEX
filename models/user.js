// Importing modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Creating the schema
const userSchema = new mongoose.Schema(
    {
        aadhar: {
            type: String,
            trim: true
        },
        pan: {
            type: String,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            enum: ['merchant', 'bank', 'beneficiary', 'organisation'],
            required: true
        },
        merchant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Merchant'
        },
        bank: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bank'
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    { timestamps: true }
);

// Hashing the password
userSchema.pre('save', async function (next) {
    let currentUser = this;
    if (!currentUser.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        currentUser.password = await bcrypt.hash(currentUser.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
});

// Generating jwt
userSchema.statics.generatejwt = async (userid) => {
    const user = await User.findById(userid);
    const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h'
        }
    );
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

const User = mongoose.model('User', userSchema);

// Exporting the module
module.exports = User;
