const express = require('express');
const router = express.Router();
const userServices = require('../services/user.service');
//const expressJoi = require('express-joi-validator');
//const requestSchema = require('../schemas/user.schema');

//API EndPoints for Employee Functionality
router.get('/getAll', userServices.getAll);
router.get('/getUsers', userServices.getUsers);
//router.post('/addemployee', expressJoi(requestSchema.addEmployeeSchema), employeeServices.addEmployee);


module.exports = router;