import express from 'express';
import Employee from '../models/Employee.js'; // Ensure the path to the model is correct

const router = express.Router();

// Create a new employee
router.post('/employees', async(req, res) => {
    try {
        const { name, position, department, salary } = req.body; // Destructure relevant fields (update as needed)

        // Simple validation (can be more complex as needed)
        if (!name || !position || !department || !salary) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create and save a new employee
        const newEmployee = new Employee({
            name,
            position,
            department,
            salary,
        });

        await newEmployee.save();
        res.status(201).json(newEmployee); // Return the created employee object
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating employee', error: error.message });
    }
});

// Get all employees
router.get('/employees', async(req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
});

// Get a single employee by ID
router.get('/employees/:id', async(req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching employee', error: error.message });
    }
});

// Update an employee by ID
router.put('/employees/:id', async(req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error updating employee', error: error.message });
    }
});

// Delete an employee by ID
router.delete('/employees/:id', async(req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
});

export default router;