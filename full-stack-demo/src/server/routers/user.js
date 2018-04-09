const router = require('koa-router')();
const userControl = require('../app/controller/user');

const routers = router
    .get('/user/:id', userControl.getUserInfo)
    .get('/user/exit/:name', userControl.judgeUserExit)
    .post('/user', userControl.postUserAuth)
    .post('/adduser', userControl.registerUserInfo);
module.exports = routers;