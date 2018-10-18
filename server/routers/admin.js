const router = require('koa-router')()
const adminController = require('./../controllers/admin')
const routers = router
    .post('/', adminController.create)
    .get('/', adminController.obtain)
    .put('/', adminController.modify)
    .delete('/', adminController.deleted);
module.exports = routers;
