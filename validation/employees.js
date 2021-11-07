const Joi = require('joi')

const schemaRegistration = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().alphanum().min(2).max(50).required(),
    position: Joi.string().valid('administrator', 'boss', 'regular user').required(),
    name: Joi.string().required(),
    boss_name:Joi.string().optional()
  })

  const schemaLogin = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().alphanum().min(2).max(50).required(),
  })

  const schemaChangeBoss = Joi.object({
    boss_name: Joi.string().required().min(3)
  })

  const validate = (shema, body, next) => {
    const { error } = shema.validate(body)
    if (error) {
      const [{ message }] = error.details
      return next({
        status: 400,
        message: `MISSING FIELDS: ${message}`
      })
    }
    next()
  }
  
  module.exports.validateRegistration = (req, res, next) => {
    return validate(schemaRegistration, req.body, next)
  }
  
  module.exports.validateLogin = (req, res, next) => {
    return validate(schemaLogin, req.body, next)
  }

  module.exports.validateChangeBoss = (req, res, next) => {
    return validate(schemaChangeBoss, req.body, next)
  }