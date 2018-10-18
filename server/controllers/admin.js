const userCode = require('./../codes/user')
const userInfoService = require('../services/admin')


module.exports = {
    async create(ctx) {
        ctx.body = '创建管理员'
    },
    async obtain(ctx) {
        ctx.body = '获取管理员'
    },
    async modify(ctx) {
        ctx.body = '修改管理员'
    },
    async deleted(ctx) {
        ctx.body = '删除管理员'
    }
};
