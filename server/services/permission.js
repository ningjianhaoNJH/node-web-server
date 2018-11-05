const permissionModel = require('../models/permission');

const permission = {
    async postPermission(formBody) {
        let _result = true;
        try {
            if (formBody.permissionAuditing) {
                await permissionModel.postPermissionByUserId({user_id:formBody.user_id, permission_id: 4})
            }
            if(formBody.permissionCollect) {
                await permissionModel.postPermissionByUserId({user_id:formBody.user_id, permission_id: 2})
            }
            if(formBody.permissionShopWithdraw) {
                await permissionModel.postPermissionByUserId({user_id:formBody.user_id, permission_id: 5})
            }
            if(formBody.permissionWithdraw) {
                await permissionModel.postPermissionByUserId({user_id:formBody.user_id, permission_id: 3})
            }
        } catch (err) {
            _result = false
        }
        return _result
    }

};
module.exports = permission;
