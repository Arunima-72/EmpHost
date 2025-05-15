const express = require('express');
const router = express.Router();
const employeeData = require('../model/empdata');
const { verifyToken, admin } = require('../routes/auth');

router.use(express.json());

// View All - Admin and Employee
router.get('/get', verifyToken, async (req, res) => {
  try {
    const employees = await employeeData.find();
    res.status(200).send(employees);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching data' });
  }
});

// Add - Admin only
router.post('/add', verifyToken, admin, async (req, res) => {
  try {
    const newEmp = new employeeData(req.body);
    await newEmp.save();
    res.status(201).send({ message: 'Employee added' });
  } catch (err) {
    res.status(400).send({ message: 'Failed to add employee' });
  }
});

// Edit - Admin only
router.put('/edit/:id', verifyToken, admin, async (req, res) => {
  try {
    await employeeData.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: 'Updated successfully' });
  } catch (err) {
    res.status(400).send({ message: 'Update failed' });
  }
});

// Delete - Admin only
router.delete('/delete/:id', verifyToken, admin, async (req, res) => {
  try {
    await employeeData.findByIdAndDelete(req.params.id);
    res.send({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).send({ message: 'Delete failed' });
  }
});

module.exports = router;
