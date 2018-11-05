/**
 *  管理员业务操作
 * */

const adminModel = require('../models/admin');
const userModel = require('../models/user');
const admin = {
    async getAdmin(payload) {
        let result = await adminModel.getAdminListByShopId(payload.shopId);
        return result
    },
    async getAdminName(payload) {
        let result = await adminModel.getAdminByUsername(payload);
        if (Array.isArray(result) && result.length !== 0) {
            return true
        }
        return false
    },
    async postAdmin(payload) {
        let result = await adminModel.generateAdmin(payload);
        return result
    },
    async getAdminInfo(ctx, formBody) {
        let result = await userModel.getOneByUserNameAndPassword({username: ctx.decode.username, password: formBody.adminPassword});
        let _validate = {
            isMatched: false,
            adminType: 0,
            shopId: null
        };
        if (!result) {
            _validate.isMatched = true;
        } else {
            if (result.admin_type === 0) {
                _validate.adminType = 1;
                _validate.shopId = 0;
            } else {
                _validate.adminType = 3;
            }
        }
        return _validate
    },
    async putAdmin(payload) {
        let result = await adminModel.generateAdmin(payload);
        return result
    },
}
module.exports = admin;
