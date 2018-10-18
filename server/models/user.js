const dbUtils = require('./../utils/db-utils');
const user = {

    async getOneByUserNameAndPassword( options ) {
        let _sql = `SELECT * from admin where password="${options.password}" and account_name="${options.accountName}" limit 1`;
        let result = await dbUtils.query( _sql );
        if ( Array.isArray(result) && result.length > 0 ) {
            result = result[0]
        } else {
            result = null
        }
        return result
    },

    async getPermissionByUserId( uid ) {
        let _sql = `SELECT * from user_permission where user_id="${uid}" `;
        let result = await dbUtils.query( _sql );
        return result
    },
}

module.exports = user;
