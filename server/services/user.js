/**
 *  用户业务操作
 * */

// const validator = require('validator');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'));

const user = {
    async signIn( formData ) {
        let resultData = await userModel.getOneByUserNameAndPassword({
            password: formData.password,
            username: formData.username});
        return resultData
    },
    async permission(userId) {
        let resultData = await userModel.getPermissionByUserId(userId);
        return resultData;
    },
    async token(userResult, userPermission) {

        let [foo, bar] = await Promise.all([this.getToken(userResult, userPermission, 'token', 'wallet-shell'),
            this.getToken(userResult, userPermission, 'refresh', 'wallet-shell')]);
        return [foo, bar]
    },
    async getToken(userResult, userPermission, type, service) {
        let token = jwt.sign({
            username: userResult.username,
            userId: userResult.id,
            type: type,
            service: service,
            shopId: userResult.shop_id,
            adminType: userResult.admin_type,
            permissionList: userPermission,
        }, publicKey, { expiresIn: '168h' });
        return token
    }
}
module.exports = user;
