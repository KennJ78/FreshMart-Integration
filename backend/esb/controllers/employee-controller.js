const axios = require('axios');

const getEmployees = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.EMPLOYEE_SERVICE}/all`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createEmployee = async (req, res) => {
    try {
        const response = await axios.post(`${process.env.EMPLOYEE_SERVICE}/create`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update an existing employee
const updateEmployee = async (req, res) => {
    const { id } = req.params; // Get employee ID from URL parameters
    try {
        const response = await axios.put(`${process.env.EMPLOYEE_SERVICE}/update/${id}`, req.body);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const response = await axios.post(`${process.env.EMPLOYEE_SERVICE}/delete/${id}`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = { getEmployees, createEmployee, deleteEmployee,updateEmployee,};