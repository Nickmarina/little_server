const jwt = require ('jsonwebtoken')
const {Employee} = require ('../db/employeesModel')
const { UnauthorizedError} = require('../middlewares/errors')


const registration = async(body)=>{
    const newEmployee = new Employee(body)
    const bossName = newEmployee.boss_name
    if(bossName.length>0){
        const boss = await Employee.findOne({name: bossName})
        newEmployee.boss_id = boss._id
    }
    await newEmployee.save()
    return newEmployee
}

const login = async(email, password) =>{
    const employee = await Employee.findOne({email})
    if (!employee || employee.password!==password){
        throw new UnauthorizedError('Email or password is wrong')
    }
    const id = employee._id
    const token = jwt.sign({ _id: id }, process.env.JWT_SECRET)
    const loginEmployee = await Employee.findByIdAndUpdate(id, { $set: { token } }, { new: true })
    return loginEmployee
}

const logout = async(_id) => {
    await Employee.findByIdAndUpdate(_id, { $set: { token: null } })
   }


module.exports={registration, login, logout} 