/**
 * 整合所有子路由
 */

const router = require('koa-router')();
const home = require('./home');
const user = require('./user');
const task = require('./task');
const log = require('../utils/logger').createLogger('vukoa:server:routers:index');


router.use('', home.routes(), home.allowedMethods(), user.routes(), task.routes());


module.exports = router;
