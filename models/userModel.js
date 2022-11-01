const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your Name']
    },
    email: {
        type: String,
        required: [true, 'Please Provide Your Email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please Provide a Valid Email Address']
    },
    photo: String,
    role: {
        type: String,
        enum: ['user', 'team-lead', 'regional_supervisor','mechatronics','manager', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please Provide a Password'],
        minlenght: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please Confirm Password'],
        validate: {
         //This will always work when we Create and Save! a user!!
        validator: function(el){
            return el === this.password;
        },
         message: 'Password are not same'   
        }
        
    },
    passwordResetToken: String,
    passwordChangedAt: Date,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

// PASSWORD ENCRYPTION
userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
    
    //Hash the password with const parameter of 12.
     this.password =  await bcrypt.hash(this.password, 12)
    
     //Delete passwordConfirm field
     this.passwordConfirm = undefined;
     next();  
    });

    //INSTANCE METHOD(it is available on all User Document)
userSchema.methods.correctpassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.changedPasswordAfter){
        const changedTimeStamp = parseInt (this.passwordChangedAt?.getTime() / 1000, 10 );
  
        //console.log(changedTimeStamp, JWTTimestamp);
        return JWTTimestamp < changedTimeStamp;
    };
    //False means NOT changed
    return false;
};

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

       // console.log({resetToken}, this.passwordResetToken);

        this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

        return resetToken;

}

const User = mongoose.model('Users', userSchema);
module.exports = User;