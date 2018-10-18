const router = require('koa-router')();

const admin = require('./admin');
const user = require('./user');
router.use('/admin', admin.routes(), admin.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());
module.exports = router;
