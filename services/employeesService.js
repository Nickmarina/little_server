const {Employee} = require ('../db/employeesModel')
const {ConflictError} = require('../middlewares/errors')

const getEmployees = async(_id, position)=>{
    let employees;
    if(position ==='administrator'){
       employees= Employee.find({}).select('-_id -__v -password -boss_id -token' )
    } else if(position ==='boss'){
        employees = Employee.find({boss_id:_id}).select('-_id -__v -password -boss_id -token -boss_name')
    }else if( position ==='regular user'){
        employees = Employee.findOne({_id}).select('-_id -__v -password -boss_id -token')
        // employees = 'Hello.You cannnot see the list of staff, because your position is a regular user'
    }
    return employees
}

const changeBoss = async(_id, newBoss) =>{
    const boss = await Employee.findOne({name:newBoss})
    if(!boss){
        throw new ConflictError(`Cannot find this boss`)
    }
    const {boss_name} = await Employee.findByIdAndUpdate(_id, { $set: { boss_name: newBoss, boss_id:boss._id} }, { new: true })
    return boss_name
}

module.exports={getEmployees, changeBoss} 