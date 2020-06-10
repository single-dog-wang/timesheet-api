const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const mount = require('mount-routes')
const bodyParser = require('body-parser')

const app = express()

// 连接MongoDb数据库
const { db } = require('./config/config')
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.log("连接失败")
    } else {
        console.log("连接成功")
    }
})

// 解析post请求参数
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 统一返回结果集
const apiResult = require('./middleware/apiResult')
app.use(apiResult)

// token 验证
const authorization = require('./middleware/authorization')
app.use('/user/*', authorization)

// 挂载routes下面的所有路由
mount(app, path.join(process.cwd(), '/routes'), true)



app.listen(3000, () => console.log('listen port 3000'))