
const user = require('../../service/user.js');
const jwt = require('jsonwebtoken');

const getUserInfo = async function (ctx) {
    const id = ctx.params.id; // 获取url里传过来的参数里的id
    const result = await user.getUserById(id); // 通过await “同步”地返回查询结果
    ctx.body = result; // 将请求的结果放到response的body里返回
};

const judgeUserExit = async function (ctx) {
    const name = ctx.params.name;
    const result = await user.getUserByName(name);
    if (result !== null) {
        ctx.body = {
            success: true,
            info: '该用户已存在',
        };
    } else {
        ctx.body = {
            success: false,
            info: '该用户不存在',
        };
    }
};

const postUserAuth = async function (ctx) {
    const data = ctx.request.body.fields; // post过来的数据存在request.body里
    const userInfo = await user.getUserByName(data.name);
    if (userInfo !== null) { // 如果查无此用户会返回null
        if (data.password !== userInfo.password) {
            ctx.body = {
                success: false, // success标志位是方便前端判断返回是正确与否
                info: '密码错误！',
            };
        } else {
            const userToken = {
                name: userInfo.user_name,
                id: userInfo.id,
            };
            // const token = jwt.sign(userToken, secret); // 签发token
            ctx.body = {
                success: true,
                name: userToken.name,
                id: userToken.id,
            };
        }
    } else {
        ctx.body = {
            success: false,
            info: '用户不存在！', // 如果用户不存在返回用户不存在
        };
    }
};

const registerUserInfo = async function (ctx) {
    const data = ctx.request.body.fields;
    const success = await user.createNewUser(data);
    ctx.body = {
        success,
    };
};

module.exports = {
    getUserInfo,
    judgeUserExit,
    postUserAuth,
    registerUserInfo,
};