const userCode = require('./../codes/user')
const userInfoService = require('../services/user')


module.exports = {
    async signIn(ctx) {
        let formData = ctx.request.body;
        let userResult = await userInfoService.signIn(formData); // 获取获取用户信息
        let result = {
            message: userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR,
            data: null,
            code: 400
        };

        if (!userResult) {
            ctx.response.status = 400;
            ctx.body = result;
            return
        }

        let userPermission = await userInfoService.permission(userResult.id); // 获取权限
        let tokenList = await userInfoService.token(userResult, userPermission); // 获取token
        result.data = {
            adminType: userResult.admin_type,
            permissionList: userPermission,
            refreshToken: tokenList[1],
            token: tokenList[0],
        };
        result.code = 200;
        result.message = "SUCCESS";
        ctx.response.status = 200;
        ctx.body = result;
    }
};
