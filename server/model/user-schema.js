
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is missing'],
        trim: true,
        unique: true,
        maxlength: [12, 'The length of user name can be maximum 12 characters'],
        minlength: [4, 'The length of user name can be minimum 4 characters']
    },
    email: {
        type: String,
        required: [true, 'User email is missing'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
    },
    image: {
        type: String,
    },
    address: {
        type: String,
        required: [true, 'User address is required'],
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

},{timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;
