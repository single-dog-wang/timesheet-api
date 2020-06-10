const mongoose = require('mongoose')

// 创建用户模式对象Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    gmt_create: {
        type: Date,
        default: Date.now
    },
    gmt_modified: {
        type: Date,
        default: Date.now
    }
})

// 创建用户模型对象
const userModel = mongoose.model("users", userSchema)

// 导出模型对象
module.exports = userModel