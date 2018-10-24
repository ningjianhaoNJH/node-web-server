const path = require('path');
const Koa = require('koa');
// const convert = require('koa-convert');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const koaCors = require('koa2-cors');
// const session = require('koa-session-minimal');
// const MysqlStore = require('koa-mysql-session');
const config = require('./../config');
const router = require('./routers/index');
const auth = require('./middleware/auth');

const app = new Koa();
app.use(koaLogger());
app.use(auth());

app.use(bodyParser());
app.use(koaCors({
    origin: "*",
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 100,
    credentials: true,
    allowMethods: ["PUT","POST","GET","DELETE","OPTIONS"],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Content-Length', 'X-Requested-With'],
}));
app.use(koaStatic(path.join(__dirname, './../static')));

app.use(router.routes()).use(router.allowedMethods())

app.listen(config.port);
console.log(`the server is start at port:${config.port}`);
