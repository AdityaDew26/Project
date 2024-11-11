import mongoose from 'mongoose';

const blacklistedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    dateBlacklisted: {
        type: Date,
        default: Date.now,
    },
});

const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistedTokenSchema);

export default BlacklistedToken;