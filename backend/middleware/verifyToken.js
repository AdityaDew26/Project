import jwt from 'jsonwebtoken';
import BlacklistedToken from '../models/BlacklistedTokens.js';

const verifyToken = async(req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        // Check if the token is blacklisted
        const blacklistedToken = await BlacklistedToken.findOne({ token });
        if (blacklistedToken) {
            return res.status(403).json({ message: 'Token has been invalidated' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to request
        next(); // Proceed to next middleware or route handler
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(403).json({ message: 'Invalid token' });
    }
};

export default verifyToken;