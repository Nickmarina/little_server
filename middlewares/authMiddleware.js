const jwt = require('jsonwebtoken')
require('dotenv').config()
const { UnauthorizedError } = require('./errors')
const { Employee } = require('../db/employeesModel')

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')
    if (!token) {
      next(new UnauthorizedError('Not authorized'))
    }

    const { _id } = jwt.decode(token[1], process.env.JWT_SECRET)

    const findedEmployee = await Employee.findOne({ _id })
    if (!findedEmployee || findedEmployee.token !== token[1]) {
      next(new UnauthorizedError('Not authorized'))
    }
    req.token = token[1]
    req.employee = findedEmployee
    next()
  } catch (err) {
      console.log(err)
    next(new UnauthorizedError('Not authorized'))
  }
}

module.exports = { authMiddleware }