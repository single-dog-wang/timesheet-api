const userModel = require('../models/userModel')

/**
 * 简单分页查询
 */
const pageQuery = async (req, res) => {
    try {
        // 每页的记录数 和 当前页码
        let pageSize = parseInt(req.params.pageSize)
        let pageNum = parseInt(req.params.pageNum)

        // 查询总记录数
        const total = await userModel.count()
        if (!total) return res.apiResult(-1, '没有用户', null)

        // 分页查询
        const pageQueryInfo = await userModel
            .find()
            .skip((pageNum - 1) * pageSize)
            .limit(pageSize)
        if (pageQueryInfo.length === 0) return res.apiResult(-1, '分页查询失败', null)

        // 数据转换
        let data = pageQueryInfo.map(item => {
            return {
                id: item._id,
                name: item.name,
                email: item.email,
                gmtCreate: item.gmt_create
            }
        })

        // 返回值 
        res.apiResult(0, '分页查询成功', {
            total,
            data
        })
    } catch (err) {
        res.apiResult(-1, err.message, null)
    }
}

/**
 * 带有条件的分页查询
 */
const pageQueryCondition = async (req, res) => {
    try {
        // 每页的记录数 和 当前页码
        let pageSize = parseInt(req.params.pageSize)
        let pageNum = parseInt(req.params.pageNum)

        // 分页条件---姓名 和 创建时间
        let name = req.body.name
        let gmtCreate = req.body.gmtCreate

        // 查询总记录数
        const total = await userModel.count()
        if (!total) return res.apiResult(-1, '没有用户', null)

        // 构建分页条件选择器
        let wapper = {}
        if (name || gmtCreate) wapper.$and = []
        if (name) wapper.$and.push({ name: { $regex: name, $options: '$i' } })
        if (gmtCreate) wapper.$and.push({ gmt_create: { $gte: gmtCreate } })

        // 分页查询
        const pageQueryInfo = await userModel
            .find(wapper)
            .skip((pageNum - 1) * pageSize)
            .limit(pageSize)
        if (pageQueryInfo.length == 0) return res.apiResult(-1, '分页查询失败', null)

        // 数据转换
        let data = pageQueryInfo.map(item => {
            return {
                id: item._id,
                name: item.name,
                email: item.email,
                gmtCreate: item.gmt_create
            }
        })

        // 返回值 
        res.apiResult(0, '分页查询成功', {
            total,
            data
        })
    } catch (err) {
        res.apiResult(-1, err.message, null)
    }
}

/**
 * 通过id查询指定的用户
 */
const queryById = async (req, res) => {
    try {
        // 获取用户id
        let uid = req.params.id
        if (!uid) return res.apiResult(-1, '获取用户id失败', null)

        // 通过id获取指定用户
        const result = await userModel.findById(uid)
        if (!result) return res.apiResult(-1, '通过id获取用户失败', null)

        // 返回值
        let data = {
            id: result._id,
            name: result.name,
            email: result.email,
            gmtCreate: result.gmt_create
        }
        res.apiResult(0, '通过id获取用户成功', data)
    } catch (err) {
        res.apiResult(-1, err.message, null)
    }
}

/**
 * 通过id修改指定用户
 */
const updateById = async (req, res) => {
    try {
        // 获取用户id 和 修改参数
        let uid = req.params.id
        let params = req.body
        if (!uid || !params) return res.apiResult(-1, '获取用户id 和 修改参数失败', null)

        // 通过id修改指定用户
        const result = await userModel.findByIdAndUpdate(
            { _id: uid },
            { $set: params },
            { new: true }
        )
        if (!result) return res.apiResult(-1, '通过id修改指定用户失败', null)

        // 返回值
        res.apiResult(0, '通过id修改指定用户成功', null)
    } catch (err) {
        res.apiResult(-1, err.message, null)
    }
}

/**
 * 通过id删除用户
 */
const deleteById = async (req, res) => {
    try {
        // 获取用户id
        let uid = req.params.id
        if (!uid) return res.apiResult(-1, '获取用户id失败', null)

        // 通过id删除用户
        const result = await userModel.findOneAndRemove({ _id: uid })
        if (!result) return res.apiResult(-1, '通过id删除用户失败', null)

        // 返回值
        res.apiResult(0, '通过id删除用户成功', null)
    } catch (err) {
        res.apiResult(-1, err.message, null)
    }
}


module.exports = {
    pageQuery,
    pageQueryCondition,
    queryById,
    updateById,
    deleteById
}