import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import UserRoutes from './routes/UserRoute.js';
import EmployeeRoutes from './routes/EmployeeRoute.js';
import verifyToken from './middleware/verifyToken.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Employee_App', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Logout route
app.post('/api/logout', (req, res) => {
    // Add logic to handle token invalidation if needed
    res.status(200).send({ message: 'Logged out successfully' });
});

// Use user routes (public routes)
app.use('/api/users', UserRoutes);

// Use employee routes (public routes for fetching data)
app.use('/api/employees', EmployeeRoutes);

// Use employee routes with token validation for secured routes (e.g., POST, PUT, DELETE)
app.use('/api/employees/secure', verifyToken, EmployeeRoutes); // Secure employee routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));