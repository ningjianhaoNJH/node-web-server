const userCode = require('./../codes/user');
const adminService = require('../services/admin');
const common = require('./../utils/common');

module.exports = {
    async create(ctx) {
        let formBody = ctx.request.body;
        let result = {
            message: 'SUCCESS',
            data: null,
            code: 200
        };
        // 判断是否有新建管理员的权限
        if (ctx.decode.adminType !== 0 && ctx.decode.adminType !== 2) {
            result.message = userCode.ERROR_PERMISSION;
            result.code = 403;
            ctx.request.status = 403;
            ctx.body = result;
            return
        }

        // 验证当前用户密码是否正确
        let validateObj = await adminService.getAdminInfo(ctx, formBody);
        if (validateObj.isMatched) {
            result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR;
            result.code = 400;
            ctx.request.status = 400;
            ctx.body = result;
            return
        }

        // 判断是否有重名
        let isUsed = await adminService.getAdminName(formBody.username);
        if (isUsed) {
            result.message = userCode.FAIL_USER_NAME_IS_EXIST;
            result.code = 400;
            ctx.request.status = 400;
            ctx.body = result;
            return
        }
        let postBody = {
            username: formBody.username,
            password: formBody.password,
            status: 1,
            admin_type: validateObj.adminType,
            shop_id: validateObj.shopId,
            account_name: formBody.accountName
        };

        let postResult = await adminService.postAdmin(postBody);
        if (!(common.gettype(postResult) === 'object Object')) {
            result.message = userCode.ERROR_SQL;
            result.code = 500;
            ctx.request.status = 500;
            ctx.body = result;
            return
        }

        let postPermission = await

        ctx.request.status = 200;
        ctx.body = result;
        // 关联用户id添加权限
    },
    async obtain(ctx) {
        let adminResult = await adminService.getAdmin(ctx.decode); // 获取获取admin
        let result = {
            message: 'SUCCESS',
            data: [],
            code: 200
        };
        if (adminResult) {
            result.data = adminResult
        }
        ctx.request.status = 200;
        ctx.body = result
    },
    async modify(ctx) {
        ctx.body = '修改管理员'
    },
    async deleted(ctx) {
        ctx.body = '删除管理员'
    }
};
