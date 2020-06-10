module.exports = {
    // MongoDb数据库
    db: "mongodb://127.0.0.1:27017/test",

    // JWT设置
    jwt: {
        secretKey: "guoya",
		expiresIn: 86400
    }
}