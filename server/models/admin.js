const dbUtils = require('./../utils/db-utils');
const admin = {
    async getAdminListByShopId(sid) {
        let _sql = `SELECT * FROM admin WHERE shop_id=${sid}`;
        let result = await dbUtils.query( _sql );
        return result;
    },
    async generateAdmin(payload) {
        let result = await dbUtils.insertData('admin', payload);
        return result;
    },
    async getAdminByUsername(payload) {
        let _sql = `SELECT id FROM admin WHERE username="${payload}"`;
        let result = await dbUtils.query( _sql );
        return result;
    },
    async putAdminByUserId(payload, id) {
        let result = await dbUtils.updateData('admin', payload, id);
    }
};
module.exports = admin;
