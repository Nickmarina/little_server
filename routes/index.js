const express = require('express');
const router = express.Router();
const {getEmployeesList, changeBossController} = require('../controllers/employeesController')
const {registrationController, loginController, logoutController} = require('../controllers/authController')
const {asyncWrapper} = require('../middlewares/asyncWrapper')
const {validateLogin, validateRegistration, validateChangeBoss} = require ('../validation/employees')
const {authMiddleware} = require('../middlewares/authMiddleware')

router.get('/staff', authMiddleware, asyncWrapper(getEmployeesList))
router.post('/registration', validateRegistration ,asyncWrapper(registrationController))
router.post('/login', validateLogin, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
router.patch('/change_boss', validateChangeBoss, authMiddleware, asyncWrapper(changeBossController))

module.exports = router;