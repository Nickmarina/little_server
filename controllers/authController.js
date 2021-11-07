const {registration, login ,logout} = require('../services/authService')

const registrationController = async(req, res, next)=>{
    const body = req.body
    const {name, position}= await registration(body)
    res.status(201).json({name, position, status:'created'})
}

const loginController = async(req, res, next)=>{
    const {email, password} = req.body
    const {token} = await login(email,password)
    res.status(200).json({token, status:'success'})
}

const logoutController = async(req, res, next) => {
    const { _id } = req.employee
    await logout(_id)
    res.status(204).json({})
}

module.exports={registrationController, loginController, logoutController}