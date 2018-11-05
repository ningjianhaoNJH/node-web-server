const dbUtils = require('./../utils/db-utils');
const permission = {
    async postPermissionByUserId(opt) {
        let result = await dbUtils.insertData('user_permission', opt);
        return result;
    },
};
module.exports = permission;
