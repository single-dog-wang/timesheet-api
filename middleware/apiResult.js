// 返回统一的结果集
// 自定义中间件
module.exports = (req, res, next) => {
    res.apiResult = (code, message, data) => {
        var fmt = req.query.fmt ? req.query.fmt : "rest";
        if (fmt === "rest") {
            res.json({
                "code": code,
                "msg": message,
                "data": data
            })
        }
    }
    next()
}
