const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'));
function checkAuth(ctx) {
    let token = ctx.request.header.authorization;
    try {
        let decode = jwt.verify(token, publicKey);
        if (!decode) return null;
        return decode
    } catch (err) {
        return null
    }
}

module.exports = function() {
    return async function(ctx, next) {
        if (ctx.request.url === '/user') {
            await next();
            return
        }
        let decode = await checkAuth(ctx);
        if (!decode) {
            let result = {
                message: 'token过期',
                data: null,
                code: 503
            };
            ctx.response.status = 503;
            ctx.body = result;
        } else {
            ctx.decode = decode;
            await next()
        }
    }
};
