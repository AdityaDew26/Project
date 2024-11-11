import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Making name required
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensuring the email is unique
        lowercase: true, // Email should be case-insensitive
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Email format validation
    },
    password: {
        type: String,
        required: true, // Making password required
    },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const UserModel = mongoose.model('User', userSchema);

export default UserModel;