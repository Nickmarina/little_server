const mongoose = require('mongoose')

const employeesSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Set your name & surname'],
    },
    email:{
        type: String,
        required: [true, 'Set your email'],
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
    },
    position:{
        type: String,
        required: [true, 'Position is required'],
    },
    boss_name:{
        type: String,
        default: '',
        ref: 'Employee',
    },
    boss_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String,
        default: null,
    }
})

const Employee = mongoose.model('Employee', employeesSchema)

module.exports={Employee}