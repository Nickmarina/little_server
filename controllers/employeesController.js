const  {getEmployees, changeBoss} = require('../services/employeesService')

const getEmployeesList = async(req, res, next)=>{
    const { _id, position} = req.employee
    const employees = await(getEmployees(_id, position));
    res.status(200).json({ employees, status: 'success' })
}

const changeBossController = async(req, res, next)=>{
    const {_id} = req.employee
    const {boss_name: newBoss} = req.body
    const boss = await changeBoss(_id, newBoss)
    res.status(200).json({ status: `New boss: ${boss}` })
}
   

module.exports={getEmployeesList, changeBossController}