
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'first name is required'],
        trim: true,
        unique: true,
        maxlength: [12, 'The length of name can be maximum 12 characters'],
        minlength: [4, 'The length of name can be minimum 4 characters']
    },

    lastname: {
        type: String,
        required: [true, 'last name is required'],
        trim: true,
        unique: true,
        maxlength: [12, 'The length of name can be maximum 12 characters'],
        minlength: [4, 'The length of name can be minimum 4 characters']
    },

    username: {
        type: String,
        required: [true, 'user name is required'],
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },

    email: {
        type: String,
        required: [true, 'User email is missing'],
        trim: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: [true, 'User password is required'],
    },

    phone: {
        type: String,
        required: [true, 'User phone is required'],
    },
    
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isBanned: {
        type: Boolean,
        default: false,
},

});

const User = mongoose.model('User', userSchema);

export default User;
