const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    lastLogin: {
        type: Date,
        default: new Date()
    },
    tokens: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    
    const token = jwt.sign({ _id: user._id.toString() }, 'mySecret', { expiresIn: '1 day' });
    const expiresAt = jwt.decode(token).exp;  
    user.tokens = user.tokens.concat({ token, expiresAt });

    await user.save();
    return { token, expiresAt };
}

userSchema.methods.UpdateLogin = async function () {
    const user = this;
    user.lastLogin = new Date();
    await user.save();
}

userSchema.methods.getUsername = function () {
    const user = this;
    const userObject = user.toJSON();

    delete userObject.email;

    return userObject;
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email });

    if (!user) {
        throw new Error('E-Mail not found!');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error('Password not correct!');
    }

    return user;
}


// Hash password
userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;